import stripe from "../../config/stripe.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import * as Yup from "yup";

class StripeController {
  async createCheckoutSession(req, res) {
    const schema = Yup.object()
      .shape({
        order_id: Yup.string()
          .uuid("order_id deve ser um UUID válido")
          .required("order_id é obrigatório"),
      })
      .noUnknown(true, "Campos adicionais não são permitidos");

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: "Validation fails",
        messages: err.inner.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    const { order_id } = req.body;

    const order = await Order.findOne({
      where: { id: order_id, user_id: req.user_id },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Order is not eligible for payment" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: order.items.map((item) => ({
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

    // 🔥 AQUI ESTAVA O BUG — AGORA RESOLVIDO
    const [payment] = await Payment.findOrCreate({
      where: { order_id: order.id },
      defaults: {
        method: "stripe",
        amount: order.total,
        status: "pending",
        checkout_session_id: session.id,
      },
    });

    if (payment.checkout_session_id !== session.id) {
      await payment.update({
        method: "stripe",
        checkout_session_id: session.id,
        status: "pending",
      });
    }

    return res.json({ url: session.url });
  }
}

export default new StripeController();
