import { utils, ethers } from "ethers";
import ABI from "../utils/contract-abi.json";
import { config, wssProvider } from "../Config/config";

export const abiInterface = new ethers.utils.Interface(ABI);
export const signer = new ethers.Wallet(config.PRIVATE_KEY);
export const account = signer.connect(config.provider);
export const Contract = new ethers.Contract(
  config.UNISWAP_ROUTER,
  ABI,
  account
);
export const contract = new ethers.Contract(config.UNISWAP_ROUTER, ABI);

export const getTransaction = async (tx: any) => {
  try {
    const txData = await wssProvider.getTransaction(tx);
    return txData;
  } catch (error) {
    console.log("sorry, cannot get tx data", error);
  }
};

export const getAmountOut = async (amountIn: number, path: string[]) => {
  try {
    const amountOut = await contract.getAmountOut(amountIn, path);
    return amountOut;
  } catch (error) {
    console.log("Error getting amounts out", error);
  }
};

export const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
