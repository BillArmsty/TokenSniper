/** @format */

import { wssProvider } from "../Config/config";
import { getTransaction, wait } from "../contents/common";
import { txContents } from "../contents/interface";
import { dataProcessing } from "./dataProcessing";

require("dotenv").config();

export const streamData = async () => {
  //wss connection
  try {
    await wait(10000);

    wssProvider.on("pending", async (tx: any) => {
      //   console.log(tx);
      let txReceipt = await getTransaction(tx);
      //   console.log(txReceipt);

      if (txReceipt) {
        const txContents: txContents = {
          hash: txReceipt.hash,
          from: txReceipt.from,
          to: txReceipt.to,
          maxPriorityFeePerGas: txReceipt.maxPriorityFeePerGas,
          maxFeePerGas: txReceipt.gasPrice,
          gas: txReceipt.gasLimit,
          gasPrice: txReceipt.gasPrice,
          data: txReceipt.data,
        };
        await dataProcessing(txContents);
        // } else {
        //   await wait(3000);
        //   let txReceipt: any = await getTransaction(tx);
        //   if (txReceipt) {
        //     const txContents: txContents = {
        //       hash: txReceipt.hash,
        //       from: txReceipt.from,
        //       to: txReceipt.to,
        //       maxPriorityFeePerGas: txReceipt.maxPriorityFeePerGas,
        //       maxFeePerGas: txReceipt.gasPrice,
        //       gas: txReceipt.gasLimit,
        //       gasPrice: txReceipt.gasPrice,
        //       data: txReceipt.data
        //     };
        //     await dataProcessing(txContents);
        //   }
      }
    });
  } catch (error) {}
};
