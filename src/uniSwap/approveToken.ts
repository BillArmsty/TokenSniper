/** @format */

import { ethers } from "ethers";
import { approveABI, config, MAX_INT } from "../Config/config";
import { account } from "../contents/common";
import { Overloads } from "../contents/interface";

export const approve = async (token: string, overLoads: Overloads) => {
  try {
    let approveContract = new ethers.Contract(token, approveABI, account);

    const approve = await approveContract.approve(
      config.UNISWAP_ROUTER,
      MAX_INT,
      overLoads
    );
    console.log("\n\n\n ************** APPROVE ***************");
    console.log("Transaction hash: ", approve.hash);
    console.log("*********************************************");
    return { success: true, data: approve.hash };
  } catch (error) {
    console.log("Error => ", error);
    return { success: false, data: error };
  }
};
