import * as Yup from "yup";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

class OrdersController {
  async create(req, res) {
    const { user_id } = req.params;
    const cart_items = await CartItem.findAll({ where: { user_id } });

    if (cart_items.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    let total = 0;
    for (const item of cart_items) {
      const product = await Product.findByPk(item.product_id);
      total += Number(product.price) * item.quantity;
    }

    const order = await Order.create({ user_id, total, status: "pending" });

    for (const item of cart_items) {
      const product = await Product.findByPk(item.product_id);
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    await CartItem.destroy({ where: { user_id } });
    return res.status(201).json(order);
  }

  async list(req, res) {
    const orders = await Order.findAll({
      include: [{ model: OrderItem }],
    });
    return res.json(orders);
  }
}

export default new OrdersController();
