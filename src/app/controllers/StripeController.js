import stripe from "../../config/stripe.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

class StripeController {
  async createCheckoutSession(req, res) {
    const { order_id } = req.body;

    const order = await Order.findOne({
      where: { id: order_id, user_id: req.user_id },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (!process.env.FRONTEND_URL?.startsWith("http")) {
      throw new Error("FRONTEND_URL inválida ou não definida");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: order.OrderItems.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/pagamento/sucesso`,
      cancel_url: `${process.env.FRONTEND_URL}/`,
      metadata: {
        order_id: order.id,
      },
    });

    await Payment.update(
      {
        method: "stripe",
        status: "pending",
        checkout_session_id: session.id,
      },
      { where: { order_id: order.id } }
    );

    return res.json({ url: session.url });
  }
}

export default new StripeController();
