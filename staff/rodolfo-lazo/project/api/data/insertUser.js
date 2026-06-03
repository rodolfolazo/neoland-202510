import { UserModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function insertUser(userData) {
  const userModel = new UserModel(userData);

  return userModel
    .save()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
}
