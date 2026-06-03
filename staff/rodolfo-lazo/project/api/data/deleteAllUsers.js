import { UserModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function deleteAllUsers() {
  return UserModel.deleteMany({})
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
}
