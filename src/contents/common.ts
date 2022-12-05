import { utils, ethers } from "ethers";

import { config, wssProvider } from "../config/config";
import { UNISWAP_ABI } from "../utils/uniswap";

export const abiInterface = new ethers.utils.Interface(UNISWAP_ABI);
export const signer = new ethers.Wallet(config.PRIVATE_KEY);
export const account = signer.connect(config.provider);
export const Contract = new ethers.Contract(
  config.UNISWAP_ROUTER,
  UNISWAP_ABI,
  account
);
export const contract = new ethers.Contract(config.UNISWAP_ROUTER, UNISWAP_ABI);

export const getTransaction = async (tx: any) => {
  try {
    const txData = await wssProvider.getTransaction(tx);
    return txData;
  } catch (error) {
    console.log("sorry, cannot get tx data", error);
  }
};

export const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
