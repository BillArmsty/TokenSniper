import { ethers } from "ethers";

require("dotenv").config();

export const WSS_URL = process.env.WSS_URL!;

export const gasLimit = 500000;
export const buyAmount = 0.000001;
export const walletAddress = ethers.utils.getAddress(
  process.env.WALLET_ADDRESS!
);

export const wssProvider = new ethers.providers.WebSocketProvider(WSS_URL);

export const config = {
  provider: wssProvider,
  UNISWAP_ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D".toLowerCase(),
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
  WALLET_ADDRESS: walletAddress,

  TOKEN_TO_MONITOR: process.env.TOKEN_TO_MONITOR,
  WETH_ADDRESS: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
};
export const SLIPPAGE = 50;

export const approveABI = [
  "function approve(address spender, uint value) external returns (bool)",
];
export const MAX_INT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
