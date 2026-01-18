import User from "../models/User";
import jwt from "jsonwebtoken";
import * as Yup from "yup";

import authConfig from "../../config/auth";

class SessionsController {
  async create(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
      password: Yup.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: "Validation fails",
        messages: err.inner.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password not match" });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionsController();
