import stripe from "../../config/stripe.js"; 
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

class StripeWebhookController {
  async handle(req, res) {
   
    const signature = req.headers["stripe-signature"];
    
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 

    let event;

    try {
    
      event = stripe.webhooks.constructEvent(
        req.body, 
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error("Erro na validação do Webhook:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    
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
        const session = event.data.object;
        await Payment.update(
          { status: "expired" },
          { where: { checkout_session_id: session.id } }
        );
    }

    return res.json({ received: true });
  }
}

export default new StripeWebhookController();