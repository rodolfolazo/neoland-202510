import { TransactionModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function deleteAllTransactions() {
  return TransactionModel.deleteMany({})
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
}
