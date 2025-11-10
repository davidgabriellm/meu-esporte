import * as Yup from "yup";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

class CartController {
  async addItem(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.string().uuid().required(),
      quantity: Yup.number().integer().min(1).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed." });
    }

    const { product_id, quantity } = req.body;
    const user_id = req.user_id; // ✅ vem do token, não do params

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found." });


    const existingItem = await CartItem.findOne({
      where: { user_id, product_id },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const item = await CartItem.create({ user_id, product_id, quantity });
    return res.status(201).json(item);
  }

  async list(req, res) {
    const user_id = req.user_id; // ✅ vem do token

    const items = await CartItem.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          attributes: ["name", "price", "image_url", "description"],
        },
      ],
    });

    return res.json(items);
  }

  async removeItem(req, res) {
    const { id } = req.params;
    const user_id = req.user_id; // ✅

    const item = await CartItem.findOne({ where: { id, user_id } });
    if (!item) return res.status(404).json({ error: "Item not found." });

    await item.destroy();
    return res.status(204).send();
  }
}

export default new CartController();
