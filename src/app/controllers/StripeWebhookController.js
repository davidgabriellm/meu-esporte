import stripe from "../../config/stripe.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

class StripeWebhookController {
  async handle(req, res) {
    console.log("🔥 WEBHOOK RECEBIDO");
    console.log("Headers:", req.headers);
    const signature = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.error("ERRO: STRIPE_WEBHOOK_SECRET ausente no .env");
      return res.status(500).send("Config Error");
    }

    let event;

    try {
      // O req.body aqui deve ser o Buffer bruto (graças ao ajuste no app.js)

      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(`Webhook Signature Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      console.log("📦 EVENTO:", event.type);
      const session = event.data.object;

      try {
        console.log("🔍 Buscando pagamento para sessão:", session.id);

        const payment = await Payment.findOne({
          where: { checkout_session_id: session.id },
          include: [
            {
              model: Order,
              as: "order", // Agora isso vai funcionar pois o Model Payment tem o alias
              attributes: ["id", "status"], // Trazendo apenas o necessário
            },
          ],
        });

        if (!payment) {
          console.error("❌ Pagamento não encontrado no banco.");
         
          return res.status(200).send("Payment not found handled");
        }

        // Atualiza Pagamento
        await payment.update({ status: "paid" });
        console.log("✅ Pagamento atualizado para PAID");

        // Atualiza Pedido
        if (payment.order) {
          await payment.order.update({ status: "paid" });
          console.log(`✅ Pedido ${payment.order.id} atualizado para PAID`);
        } else {
          console.warn(
            "⚠️ Pagamento encontrado, mas sem Pedido associado (verifique as associações)."
          );
        }
      } catch (err) {
        console.error("❌ Erro ao atualizar banco:", err);
        // Aqui retornamos erro para o Stripe tentar de novo depois
        return res.status(500).json({ error: "Database update failed" });
      }
    }

    return res.json({ received: true });
  }
}

export default new StripeWebhookController();
