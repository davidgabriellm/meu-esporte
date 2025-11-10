import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

class ProductsController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      price: Yup.number().required().positive(),
      stock: Yup.number().integer().min(0),
      category_id: Yup.string().uuid().nullable(),
      image_url: Yup.string().url().nullable(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed." });
    }

    const product = await Product.create(req.body);
    return res.status(201).json(product);
  }

  async list(req, res) {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ["name"] }],
    });
    return res.json(products);
  }
  async show (req, res){
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [{ model: Category, attributes: ["name"] }],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found." });

    await product.update(req.body);
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found." });

    await product.destroy();
    return res.status(204).send();
  }
}

export default new ProductsController();
