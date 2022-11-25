// const { BigNumber } = require("ethers");

export interface txContents {
  hash: string;
  from: string;
  to: any;
  maxPriorityFeePerGas?: any;
  maxFeePerGas?: any; 
  gasPrice: any;
  gas: any;
  data: string;
}

export interface Overloads {
  gasLimit?: number;
  nonce?: number;
  gasPrice?: number;
  maxPriorityFeePerGas?: number;
  maxFeePerGas?: number;
  value?: any;
}
