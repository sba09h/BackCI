import jwt from "jsonwebtoken";
import { TOKEN_S } from "../../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "no hay token, autorizacion denegada" });

  jwt.verify(token, TOKEN_S, (err, user) => {
    if (err) return res.status(403).json({ message: "token invalido" });
    req.user = user;
    next();
  });
};
