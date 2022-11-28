/** @format */

import { ethers } from "ethers";
import { buyAmount, config, gasLimit, wssProvider } from "../Config/config";
import { Overloads, txContents } from "../contents/interface";
import ABI from "../utils/contract-abi.json";
import { buy } from "../uniSwap/buy";
import { approve } from "../uniSwap/approveToken";
// import { Contract } from "../contents/common";
import { swapExactTokensForETHSupportingFeeOnTransferTokens } from "../uniSwap/sellToken";
import { getAmounts } from "../uniSwap/getAmounts";

const methodsExcluded = ["0x0", "0x"];
let tokensToMonitor: any = config.TOKEN_TO_MONITOR;

//decode the txContents.data to get the method name
const abiIn = new ethers.utils.Interface(ABI);

export const dataProcessing = async (txContents: txContents) => {
  //exclude transfer method
  if (!methodsExcluded.includes(txContents.data)) {
    //compare transaction router to unuswap router address
    let routerAddress = txContents.to?.toLocaleLowerCase();
    // console.log("fount it ", routerAddress);
    if (routerAddress == config.UNISWAP_ROUTER) {
      const decodedData = abiIn.parseTransaction({ data: txContents.data });

      const value = ethers.utils.parseUnits(buyAmount.toString(), "ether");

      let gasPrice = parseInt(txContents.gasPrice?._hex!, 16);
      let maxFeePerGas: number | undefined;
      let maxPriorityFeePerGas: number | undefined;
      let overloads: Overloads;
      if (txContents.maxFeePerGas && txContents.maxPriorityFeePerGas) {
        maxFeePerGas = parseInt(txContents.maxFeePerGas._hex!, 16);
        maxPriorityFeePerGas = parseInt(
          txContents.maxPriorityFeePerGas._hex!,
          16
        );
      }
      // console.log("oooooo", overLoads);
      const nonce = await wssProvider.getTransactionCount(
        process.env.WALLET_ADDRESS!
      );
      if (isNaN(maxFeePerGas!)) {
        overloads = {
          gasPrice,
          gasLimit: gasLimit,
          nonce: nonce,
          value: value,
        };
      } else {
        overloads = {
          gasLimit: gasLimit,
          nonce: nonce,
          maxFeePerGas,
          maxPriorityFeePerGas,
          value: value,
        };
      }

      let methodName = decodedData.name;

      // Filter the addLiquidity method
      if (methodName == "addLiquidity") {
        let token;
        let tokenA = decodedData.args.token.toLocaleLowerCase();
        let tokenB = decodedData.args.token.toLocaleLowerCase();
        console.log(`TokenA: ${tokenA}, TokenB: ${tokenB}`);

        if (tokenA === tokensToMonitor[0]) {
          token = tokenA;
        } else if (tokenB == tokensToMonitor[0]) {
          token = tokenB;
        }
      } else if (methodName == "addLiquidityETH") {
        let token = decodedData.args.token.toLocaleLowerCase();
        console.log("token", token);

        if (token) {
          let buyPath = [config.WETH_ADDRESS, token];

          if (buyPath) {
            const txHash = await buy(buyPath, overloads);
            delete overloads.value;

            if (txHash.success === true) {
              overloads["nonce"]! += 1;

              const approveHash = await approve(token, overloads);

              if (approveHash.success === true) {
                let sellPath = [token, config.WETH_ADDRESS];

                const amounts = await getAmounts(sellPath, token);

                if (amounts?.amountOutMinTx! >= 0) {
                  overloads["nonce"]! += 1;
                  await swapExactTokensForETHSupportingFeeOnTransferTokens(
                    sellPath,
                    overloads,
                    amounts?.amountIn,
                    amounts?.amountOutMin
                  );
                }
              }
            }
          }
        }
      }
    }
  }
};
