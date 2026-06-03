import { logic } from "../../logic/index.js";

export function registerUserHandler(req, res, next) {
  try {
    const { name, email, username, password, passwordRepeat, image } = req.body;

    logic
      .registerUser(name, email, username, password, passwordRepeat, image)
      .then(() => res.status(201).send())
      .catch(next);
  } catch (error) {
    next(error);
  }
}
