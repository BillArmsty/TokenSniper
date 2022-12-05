import { ethers } from "ethers";
import { walletAddress } from "../config/config";
import { Overloads } from "../contents/interface";

import { Contract } from "../contents/common";

export const swapExactTokensForETH = async (
  path: string[],
  overLoads: Overloads,
  amountIn: any,
  amountOutMin: any
) => {
  try {
    let deadline = Math.floor(Date.now() / 1000) + 60 * 2;

    const tx = await Contract.swapExactTokensForETH(
      amountIn,
      amountOutMin,
      path,
      walletAddress,
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
