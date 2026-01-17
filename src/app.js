import express from "express";
import routes from "./routes";
import cors from "cors";
import StripeWebhookController from "./app/controllers/StripeWebhookController"; // Importe o Controller aqui

import "./db/index";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.post(
      "/webhooks/stripe",
      express.raw({ type: "application/json" }),
      StripeWebhookController.handle
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
