/** @format */

import { ethers, utils } from "ethers";
import { SLIPPAGE, walletAddress, wssProvider } from "../Config/config";
import { Contract } from "../contents/common";
import UNISWAP_ABI from "../utils/contract-abi.json";

export const getAmounts = async (sellPath: string[], token: string) => {
  try {
    const tokenContract = new ethers.Contract(token, UNISWAP_ABI, wssProvider);

    const amountIn = await tokenContract.balanceOf(walletAddress);
    const amountOut = await Contract.getAmountsOut(amountIn, sellPath);
    const buyamount = parseInt(amountIn._hex) / 10 ** 18;
    const amountOutTx = parseInt(utils.formatUnits(amountOut[1]), 6);

    const amountOutMinTx = amountOutTx * ((100 - SLIPPAGE) / 100);
    const amountOutMin = ethers.utils.parseEther(amountOutMinTx.toString());

    console.log("\n\n\n ************** Get Amounts ***************\n");
    console.log("amountIn", buyamount);
    console.log("amountOutMin", amountOutMinTx);
    console.log("\n\n\n *****************************\n");

    return { amountIn, amountOutMin, amountOutMinTx };
  } catch (error) {
    console.log("error geting amounts", error);
  }
};
