import * as Yup from "yup";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

class PaymentsController {
  async create(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.string().uuid().required(),
      method: Yup.string().required(),
      amount: Yup.number().positive().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed." });
    }

    const { order_id, method, amount } = req.body;
    const order = await Order.findByPk(order_id);

    if (!order) return res.status(404).json({ error: "Order not found." });

    const payment = await Payment.create({
      order_id,
      method,
      amount,
      status: "completed",
    });

    await order.update({ status: "paid" });

    return res.status(201).json(payment);
  }
}

export default new PaymentsController();
