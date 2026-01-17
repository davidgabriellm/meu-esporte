import Payment from "../models/Payment";
import Order from "../models/Order";

class PaymentController {
  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByPk(id, {
      include: [Order]
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    if (payment.Order.user_id !== req.user_id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await payment.update({ status });

    
    if (status === "paid") {
      await payment.Order.update({ status: "paid" });
    }

    return res.json(payment);
  }
}

export default new PaymentController();
