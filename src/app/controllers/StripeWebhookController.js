
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

class StripeWebhookController {
  async handle(req, res) {
    const event = req.body;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const payment = await Payment.findOne({
        where: { checkout_session_id: session.id },
        include: [Order]
      });

      if (payment) {
        await payment.update({ status: "paid" });
        await payment.Order.update({ status: "paid" });
      }
    }

    if (event.type === "checkout.session.expired") {
      await Payment.update(
        { status: "expired" },
        { where: { checkout_session_id: event.data.object.id } }
      );
    }

    return res.json({ received: true });
  }
}

export default new StripeWebhookController();
