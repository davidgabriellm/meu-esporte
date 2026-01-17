import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Payment from "../models/Payment.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";

class OrderController {
  async store(req, res) {
    const { items, total, address_id, payment_method } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const address = await Address.findOne({
      where: { id: address_id, user_id: req.user_id },
    });

    if (!address) {
      return res.status(400).json({ error: "Invalid address" });
    }

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        return res
          .status(400)
          .json({ error: `Product not found: ${item.product_id}` });
      }

      if (Number(item.price) !== Number(product.price)) {
        return res.status(400).json({
          error: `Price mismatch for product ${product.name}`,
        });
      }
    }

    const order = await Order.create({
      user_id: req.user_id,
      address_id,
      total,
      status: "pending",
    });

    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })
      )
    );

    const payment = await Payment.create({
      order_id: order.id,
      method: payment_method,
      amount: total,
      status: "pending",
    });

    return res.status(201).json({
      order,
      items: orderItems,
      payment,
    });
  }

  async index(req, res) {
    const orders = await Order.findAll({
      where: { user_id: req.user_id },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, as: "product" }],
        },
        { model: Payment },
        { model: Address },
      ],
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, user_id: req.user_id },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, as: "product" }],
        },
        { model: Payment },
        { model: Address },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json(order);
  }
}

export default new OrderController();
