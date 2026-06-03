import { PortfolioModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function deleteAllPortfolios() {
  return PortfolioModel.deleteMany({})
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
}
