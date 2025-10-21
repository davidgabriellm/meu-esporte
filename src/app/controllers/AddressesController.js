import * as Yup from "yup";
import Address from "../models/Address.js";

class AddressesController {
  async create(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.string().uuid().required(),
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      postal_code: Yup.string().required(),
      is_default: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed." });
    }

    const address = await Address.create(req.body);
    return res.status(201).json(address);
  }

  async list(req, res) {
    const { user_id } = req.params;
    const addresses = await Address.findAll({ where: { user_id } });
    return res.json(addresses);
  }

  async update(req, res) {
    const { id } = req.params;
    const address = await Address.findByPk(id);
    if (!address) return res.status(404).json({ error: "Address not found." });

    await address.update(req.body);
    return res.json(address);
  }

  async delete(req, res) {
    const { id } = req.params;
    const address = await Address.findByPk(id);
    if (!address) return res.status(404).json({ error: "Address not found." });

    await address.destroy();
    return res.status(204).send();
  }
}

export default new AddressesController();
