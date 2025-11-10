import { Router } from "express";

import ProductsController from "./app/controllers/ProductsController";
import CategoriesController from "./app/controllers/CategoriesController";
import SessionsController from "./app/controllers/SessionsController";
import CartController from "./app/controllers/CartController";

import auth from "./app/middlewares/auth";
import UsersController from "./app/controllers/UsersController";


const routes = new Router()

routes.post("/sessions", SessionsController.create)
routes.post("/users", UsersController.register)


routes.get("/products/:id", ProductsController.show);
routes.get("/products", ProductsController.list); 


routes.use(auth)

routes.post("/cart", auth, CartController.addItem);
routes.get("/cart", auth, CartController.list);
routes.delete("/cart/:id", auth, CartController.removeItem);

routes.post("/products", ProductsController.create);     
routes.put("/products/:id", ProductsController.update); 
routes.delete("/products/:id", ProductsController.delete); 

routes.post("/categories", CategoriesController.create);  
routes.get("/categories", CategoriesController.list);      
routes.put("/categories/:id", CategoriesController.update); 
routes.delete("/categories/:id", CategoriesController.delete); 


export default routes