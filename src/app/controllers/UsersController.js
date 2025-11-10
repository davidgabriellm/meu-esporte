import * as Yup from "yup";
import User from "../models/User";

class UsersController {
  async register(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      passwordConfirmation: Yup.string().when("password", (password, field) => {
        return password
          ? field.required().oneOf([Yup.ref("password")], "Passwords must match")
          : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error validating schema." });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const { id, createdAt, updatedAt } = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({ id, name, email, createdAt, updatedAt });
  }
}

export default new UsersController();
