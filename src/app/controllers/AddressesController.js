import Address from "../models/Address";
import * as Yup from "yup";

class AddressController {
  async index(req, res) {
    const addresses = await Address.findAll({
      where: { user_id: req.user_id }
    });

    return res.json(addresses);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required("Street is required"),
      number: Yup.string().required("Number is required"),
      neighborhood: Yup.string().required("Neighborhood is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipcode: Yup.string().required("Zipcode is required")
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({
        error: "Validation failed",
        messages: error.errors
      });
    }

    const { street, number, neighborhood, city, state, zipcode } = req.body;

    const address = await Address.create({
      user_id: req.user_id,
      street,
      number,
      neighborhood,
      city,
      state,
      zipcode
    });

    return res.status(201).json(address);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipcode: Yup.string()
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({
        error: "Validation failed",
        messages: error.errors
      });
    }

    const { id } = req.params;

    const address = await Address.findOne({
      where: { id, user_id: req.user_id }
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    await address.update(req.body);
    return res.json(address);
  }

  async delete(req, res) {
    const { id } = req.params;

    const address = await Address.findOne({
      where: { id, user_id: req.user_id }
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    await address.destroy();
    return res.status(204).send();
  }
}

export default new AddressController();
