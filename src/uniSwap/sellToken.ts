/** @format */

import { ethers } from "ethers";
import { sellToWalletAddress } from "../Config/config";
import { Overloads } from "../contents/interface";
// import ABI from "../utils/contract-abi.json";
import { Contract } from "../contents/common";

//swapExactTokensForETH =selling token
// let walletAddress = ethers.utils.getAddress(SELL_TO_ADDRESS!);

export const swapExactTokensForETHSupportingFeeOnTransferTokens = async (
  path: string[],
  overLoads: Overloads,
  // amountIn: number,
  // amountOutMin: number
) => {
  try {
    let amountIn = ethers.utils.parseEther("0.001");
    let amountOutMin = ethers.utils.parseEther("0");
    let deadline = Math.floor(Date.now() / 1000) + 60 * 2;

    const tx =
      await Contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountIn,
        amountOutMin,
        path,
        sellToWalletAddress,
        deadline,
        overLoads
      );
    //overload include only nonce, gasPrice, gaslimit
    console.log("\n\n\n ************** SELL ***************\n");
    console.log(tx);

    return { success: true, data: tx.hash };
  } catch (error) {
    console.log("Error swapping exact token for ETH", error);
    return { success: false, data: error };
  }
};
