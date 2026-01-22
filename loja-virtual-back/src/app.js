import express from "express";
import routes from "./routes.js";
import cors from "cors";
import StripeWebhookController from "./app/controllers/StripeWebhookController.js"; 

import "./db/index.js";

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
