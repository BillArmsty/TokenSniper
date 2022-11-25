/** @format */

import { ethers } from "ethers";
import { walletAddress } from "../Config/config";
import { Overloads } from "../contents/interface";
// import ABI from "../utils/contract-abi.json";
import { Contract } from "../contents/common";

//swapExactETHForTokens

export const buy = async (path: string[], overLoads: Overloads) => {
  try {
    let amountOutMin = ethers.utils.parseEther("0");
    let deadline = Math.floor(Date.now() / 1000) + 60 * 2;

    const tx = await Contract.swapExactETHForTokens(
      amountOutMin,
      path,
      walletAddress,
      deadline,
      overLoads
    );
     console.log("\n\n\n ************** BUY ***************\n");
     console.log(tx);

    return { success: true, data: tx.hash };
  } catch (error) {
    console.log("Error swapping eaxct token for ETH", error);
    return { success: false, data: error };
  }
};
