import * as Yup from "yup";
import Category from "../models/Category.js";

class CategoriesController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation failed." });
      }

      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      console.error("error creating category:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (error) {
      console.error("error listing categories:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({ error: "Category not found." });

      await category.update(req.body);
      return res.json(category);
    } catch (error) {
      console.error("error updating category:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({ error: "Category not found." });

      await category.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error("error deleting category:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CategoriesController();
