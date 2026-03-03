import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import jwt from "jsonwebtoken";

import "./populate.js";

import { logic } from "./logic.js";
import {
  DuplicityError,
  ExistenceError,
  OwnershipError,
  SystemError,
  ValidationError,
  CredentialError,
  AuthError,
} from "./errors.js";

const { JsonWebTokenError } = jwt;

const JWT_SECRET = "a superman le puede la criptonita";

const api = express();

const jsonBodyParser = express.json();

api.use(cors());

api.use(jsonBodyParser);

morganBody(api, {
  logAllReqHeader: true,
  logAllResHeader: true,
});

api.get("/", (req, res) => res.json({ message: "Hello! from API ;)" }));

/**
 * @route POST /users
 * @summary Registra un nuevo usuario
 * @description Crea un usuario validando nombre, email, username y coincidencia de contraseñas.
 * Ejecuta la lógica de negocio mediante `logic.registerUser`, que se encarga de las validaciones
 * y del almacenamiento del usuario.
 *
 * @param {string} req.body.name - Nombre del usuario
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.username - Nombre de usuario único
 * @param {string} req.body.password - Contraseña del usuario
 * @param {string} req.body.passwordRepeat - Repetición de la contraseña para validación
 *
 * @returns {201} Usuario creado exitosamente
 * @returns {400} Error de validación en los datos enviados
 * @returns {409} Error de conflicto en el nombre de usuario o email
 * @returns {500} Error interno del servidor
 */
api.post("/users", (req, res, next) => {
  try {
    const { name, email, username, password, passwordRepeat } = req.body;

    logic.registerUser(name, email, username, password, passwordRepeat);

    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /users/auth
 * @summary Autentica un usuario
 * @description Autentica un usuario mediante nombre de usuario y contraseña.
 * Ejecuta la lógica de negocio mediante `logic.authenticateUser`, que se encarga de las validaciones
 * y del inicio de sesión.
 *
 * @param {string} req.body.username - Nombre de usuario
 * @param {string} req.body.password - Contraseña del usuario
 *
 * @returns {200} Usuario autenticado exitosamente con token JWT
 * @returns {400} Error de validación en los datos enviados
 * @returns {404} Error de existencia: usuario no encontrado
 * @returns {401} Error de autenticación: credenciales incorrectas
 * @returns {500} Error interno del servidor
 */
api.post("/users/auth", (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userId = logic.authenticateUser(username, password);

    const token = jwt.sign({ sub: userId }, JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /users/me/email
 * @summary Actualiza el email del usuario autenticado
 * @description Permite a un usuario cambiar su dirección de email. El endpoint requiere
 * un token JWT válido en el header `Authorization` con formato `Bearer <token>`.
 * El token es verificado usando `JWT_SECRET`, y se extrae el identificador del usuario
 * desde el key `sub`. Luego se ejecuta `logic.changeUserEmail`, que valida el email
 * actual, el nuevo email y su repetición.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.body.email - Email actual del usuario
 * @param {string} req.body.newEmail - Nuevo email solicitado
 * @param {string} req.body.newEmailRepeat - Repetición del nuevo email para validación
 *
 * @returns {204} El email fue actualizado correctamente sin contenido en la respuesta
 * @returns {400} Error de validación o datos incorrectos
 * @returns {404} Error de existencia : usuario no encontrado
 * @returns {403} OwnershipError : el usuario no es el propietario del email actual
 * @returns {401} Token inválido o expirado
 * @returns {500} Error interno del servidor
 */
api.patch("/users/me/email", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { email, newEmail, newEmailRepeat } = req.body;

    logic.changeUserEmail(userId, email, newEmail, newEmailRepeat);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /users/me/password
 * @summary Actualiza la contraseña del usuario autenticado
 * @description Permite a un usuario cambiar su contraseña. Requiere un token JWT válido
 * en el header `Authorization` con formato `Bearer <token>`. El token se verifica usando
 * `JWT_SECRET`, y se extrae el identificador del usuario desde el claim `sub`.
 * Luego se ejecuta `logic.changeUserPassword`, que valida la contraseña actual,
 * la nueva contraseña y su repetición.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.body.password - Contraseña actual del usuario
 * @param {string} req.body.newPassword - Nueva contraseña solicitada
 * @param {string} req.body.newPasswordRepeat - Repetición de la nueva contraseña para validación
 *
 * @returns {204} La contraseña fue actualizada correctamente sin contenido en la respuesta
 * @returns {400} Error de validación o datos incorrectos
 * @returns {404} Error de existencia : usuario no encontrado
 * @returns {401} Token inválido o expirado
 * @returns {500} Error interno del servidor
 */
api.patch("/users/me/password", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { password, newPassword, newPasswordRepeat } = req.body;

    logic.changeUserPassword(userId, password, newPassword, newPasswordRepeat);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /users/me
 * @summary Obtiene la información del usuario autenticado
 * @description Devuelve los datos del usuario asociado al token JWT enviado en el
 * header `Authorization` con formato `Bearer <token>`. El token se verifica usando
 * `JWT_SECRET`, y se extrae el identificador del usuario desde el claim `sub`.
 * Luego se ejecuta `logic.getUser`, que recupera la información del usuario.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 *
 * @returns {200} Devuelve un objeto JSON con los datos del usuario autenticado
 * @returns {400} Token inválido, expirado o error de validación
 * @returns {404} Error de existencia : usuario no encontrado
 * @returns {401} Falta de autorización si el token no es válido
 * @returns {500} Error interno del servidor
 */
api.get("/users/me", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const user = logic.getUser(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /users/me/image
 * @summary Actualiza la imagen del usuario autenticado
 * @description Permite modificar la imagen asociada al usuario. Requiere un token JWT válido
 * enviado en el header `Authorization` con formato `Bearer <token>`. El token se verifica
 * usando `JWT_SECRET`, y se extrae el identificador del usuario desde el claim `sub`.
 * Luego se ejecuta `logic.changeUserImage`, que valida y actualiza la imagen del usuario.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.body.image - Nueva imagen del usuario (URL o referencia)
 *
 * @returns {204} La imagen fue actualizada correctamente sin contenido en la respuesta
 * @returns {400} Error de validación, token inválido o datos incorrectos
 * @returns {404} Error de existencia : usuario no encontrado
 * @returns {401} Token expirado o no autorizado
 * @returns {500} Error interno del servidor
 */
api.patch("/users/me/image", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { image } = req.body;

    logic.changeUserImage(userId, image);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /pets
 * @summary Crea una nueva mascota asociada al usuario autenticado
 * @description Registra una mascota perteneciente al usuario identificado por el token JWT
 * enviado en el header `Authorization` con formato `Bearer <token>`. El token se verifica
 * usando `JWT_SECRET`, y se extrae el identificador del usuario desde el claim `sub`.
 * Luego se ejecuta `logic.addPet`, que valida y almacena los datos de la mascota.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.body.name - Nombre de la mascota
 * @param {string} req.body.birthdate - Fecha de nacimiento de la mascota (ISO string)
 * @param {number} req.body.weight - Peso de la mascota
 * @param {string} req.body.image - Imagen de la mascota (URL o referencia)
 *
 * @returns {201} Mascota creada exitosamente
 * @returns {400} Error de validación, token inválido o datos incorrectos
 * @returns {404} Error de existencia, usuario no encontrado
 * @returns {401} Token expirado o no autorizado
 */
api.post("/pets", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { name, birthdate, weight, image } = req.body;

    logic.addPet(userId, name, birthdate, weight, image);

    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /pets
 * @summary Obtiene todas las mascotas del usuario autenticado
 * @description Devuelve la lista de mascotas asociadas al usuario identificado por el
 * token JWT enviado en el header `Authorization` con formato `Bearer <token>`.
 * El token se verifica usando `JWT_SECRET`, y se extrae el identificador del usuario
 * desde el claim `sub`. Luego se ejecuta `logic.getPets`, que recupera todas las
 * mascotas pertenecientes al usuario.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 *
 * @returns {200} Lista de mascotas del usuario en formato JSON
 * @returns {400} Token inválido, expirado o error de validación
 * @returns {401} Token no autorizado o malformado
 */
api.get("/pets", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const pets = logic.getPets(userId);

    res.json(pets);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /pets/:petId
 * @summary Elimina una mascota del usuario autenticado
 * @description Borra una mascota perteneciente al usuario identificado por el token JWT
 * enviado en el header `Authorization` con formato `Bearer <token>`. El token se verifica
 * usando `JWT_SECRET`, y se extrae el identificador del usuario desde el claim `sub`.
 * Luego se ejecuta `logic.removePet`, que valida propiedad, existencia y permisos antes
 * de eliminar la mascota.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.params.petId - Identificador único de la mascota a eliminar
 *
 * @returns {204} Mascota eliminada correctamente sin contenido en la respuesta
 * @returns {400} Error de validación, token inválido o datos incorrectos
 * @returns {404} Eror de existencia , usuario o mascota no encontrados
 * @returns {401} Token expirado o no autorizado
 */
api.delete("/pets/:petId", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { petId } = req.params;

    logic.removePet(userId, petId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /pets/:petId/detail
 * @summary Obtiene el detalle de una mascota del usuario autenticado
 * @description Devuelve la información completa de una mascota perteneciente al usuario
 * identificado por el token JWT enviado en el header `Authorization` con formato
 * `Bearer <token>`. El token se verifica usando `JWT_SECRET`, y se extrae el identificador
 * del usuario desde el claim `sub`. Luego se ejecuta `logic.getPet`, que valida propiedad,
 * existencia y permisos antes de devolver los datos de la mascota.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.params.petId - Identificador único de la mascota
 *
 * @returns {200} Objeto JSON con los datos completos de la mascota
 * @returns {400} Error de validación, token inválido o datos incorrectos
 * @returns {401} Token expirado o no autorizado
 */
api.get("/pets/:petId/detail", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { petId } = req.params;

    const pet = logic.getPet(userId, petId);

    res.json(pet);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /pets/:petId
 * @summary Modifica completamente los datos de una mascota del usuario autenticado
 * @description Actualiza la información de una mascota perteneciente al usuario identificado
 * por el token JWT enviado en el header `Authorization` con formato `Bearer <token>`.
 * El token se verifica usando `JWT_SECRET`, y se extrae el identificador del usuario desde
 * el claim `sub`. Luego se ejecuta `logic.modifyPet`, que valida propiedad, existencia y
 * coherencia de los datos antes de aplicar los cambios.
 *
 * @param {string} req.headers.authorization - Token JWT en formato `Bearer <token>`
 * @param {string} req.params.petId - Identificador único de la mascota a modificar
 * @param {string} req.body.name - Nuevo nombre de la mascota
 * @param {string} req.body.birthdate - Nueva fecha de nacimiento (ISO string)
 * @param {number} req.body.weight - Nuevo peso de la mascota
 * @param {string} req.body.image - Nueva imagen de la mascota (URL o referencia)
 *
 * @returns {204} Mascota modificada correctamente sin contenido en la respuesta
 * @returns {400} Error de validación, token inválido o datos incorrectos
 * @returns {401} Token expirado o no autorizado
 */
api.put("/pets/:petId", (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);

    const { petId } = req.params;

    const { name, birthdate, weight, image } = req.body;

    logic.modifyPet(userId, petId, name, birthdate, weight, image);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @summary Middleware global de manejo de errores
 * @description Intercepta cualquier error lanzado en la aplicación y lo traduce a una
 * respuesta HTTP consistente. Determina el código de estado según el tipo de error:
 * - ValidationError → 400 (datos inválidos)
 * - DuplicityError → 409 (conflicto por duplicidad)
 * - ExistenceError → 404 (recurso no encontrado)
 * - CredentialError → 401 (credenciales inválidas)
 * - OwnershipError → 403 (acceso prohibido)
 * - JsonWebTokenError -> 401 (token inválido)
 * - Cualquier otro error → 500 (error interno del servidor)
 *
 * Devuelve un objeto JSON con:
 * - `error`: nombre del tipo de error
 * - `message`: descripción del error
 *
 * @param {Error} error - Error capturado en la cadena de middlewares
 * @param {import("express").Request} req - Objeto de solicitud HTTP
 * @param {import("express").Response} res - Objeto de respuesta HTTP
 * @param {import("express").NextFunction} next - Función para delegar al siguiente middleware
 *
 * @returns {void} Envía una respuesta JSON con el código de estado correspondiente
 */
api.use((error, req, res, next) => {
  let status = 500;
  let errorName = error.constructor.name;

  const { message } = error;

  if (error instanceof ValidationError) status = 400;
  else if (error instanceof DuplicityError) status = 409;
  else if (error instanceof ExistenceError) status = 404;
  else if (error instanceof CredentialError) status = 401;
  else if (error instanceof JsonWebTokenError) {
    status = 401;
    errorName = JsonWebTokenError.name;
    message = "Token inválido, expirado o error de validación";
  } else errorName = SystemError.name;

  res.status(status).json({ error: errorName, message });
});

api.listen(8080, () => console.log("API listening on port 8080"));
