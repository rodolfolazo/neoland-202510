import { TransactionModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function insertTransaction(transactionData) {
  const transactionModel = new TransactionModel(transactionData);

  return transactionModel
    .save()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
}
