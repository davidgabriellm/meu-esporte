import { Router } from "express";

import ProductsController from "./app/controllers/ProductsController";
import CategoriesController from "./app/controllers/CategoriesController";
import SessionsController from "./app/controllers/SessionsController";
import CartController from "./app/controllers/CartController";
import UsersController from "./app/controllers/UsersController";

import auth from "./app/middlewares/auth";

const routes = new Router();

// Rotas públicas
routes.post("/sessions", SessionsController.create);
routes.post("/users", UsersController.register);

routes.get("/products/:id", ProductsController.show);
routes.get("/products", ProductsController.list);
routes.get("/categories", CategoriesController.list);

// ⬇️ Daqui em diante, tudo precisa de token
routes.use(auth);

routes.get("/me", UsersController.me);

routes.get("/addresses", AddressController.index);
routes.post("/addresses", AddressController.store);
routes.put("/addresses/:id", AddressController.update);
routes.delete("/addresses/:id", AddressController.delete);


routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.get("/orders/:id", OrderController.show);


routes.put("/payments/:id", PaymentController.update);

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
