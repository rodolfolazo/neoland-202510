import { UserModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function updateUser(userData) {
  return UserModel.updateOne({ _id: userData.id }, { $set: userData })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
}
