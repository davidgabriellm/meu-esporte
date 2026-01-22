import { Router } from "express";

import StripeController from "./app/controllers/StripeController.js";

import ProductsController from "./app/controllers/ProductsController.js";
import CategoriesController from "./app/controllers/CategoriesController.js";
import SessionsController from "./app/controllers/SessionsController.js";
import CartController from "./app/controllers/CartController.js";
import UsersController from "./app/controllers/UsersController.js";
import AddressesController from "./app/controllers/AddressesController.js";
import OrdersController from "./app/controllers/OrdersController.js"
import PaymentsController from "./app/controllers/PaymentsController.js"

import auth from "./app/middlewares/auth.js";

const routes = new Router();


routes.post("/sessions", SessionsController.create);
routes.post("/users", UsersController.register);

routes.get("/products/:id", ProductsController.show);
routes.get("/products", ProductsController.list);
routes.get("/categories", CategoriesController.list);

routes.use(auth);

routes.post("/payments/checkout-session", StripeController.createCheckoutSession);

routes.get("/me", UsersController.me);

routes.get("/addresses", AddressesController.index);
routes.post("/addresses", AddressesController.store);
routes.put("/addresses/:id", AddressesController.update);
routes.delete("/addresses/:id", AddressesController.delete);


routes.post("/orders", OrdersController.store);
routes.get("/orders", OrdersController.index);
routes.get("/orders/:id", OrdersController.show);


routes.put("/payments/:id", PaymentsController.update);

routes.post("/cart", CartController.addItem);
routes.get("/cart", CartController.list);
routes.delete("/cart/:id", CartController.removeItem);
routes.put("/cart/:id", CartController.updateItem);

routes.post("/products", ProductsController.create);
routes.put("/products/:id", ProductsController.update);
routes.delete("/products/:id", ProductsController.delete);

routes.post("/categories", CategoriesController.create);
routes.put("/categories/:id", CategoriesController.update);
routes.delete("/categories/:id", CategoriesController.delete);

export default routes;
