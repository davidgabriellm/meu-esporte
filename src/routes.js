import { Router } from "express";

import ProductsController from "./app/controllers/ProductsController";
import CategoriesController from "./app/controllers/CategoriesController";
import SessionsController from "./app/controllers/SessionsController";

import auth from "./app/middlewares/auth";


const routes = new Router()

routes.post("/sessions", SessionsController.create)


routes.use(auth)

routes.get('/home', (req, res) => {
    res.send("ola mundo!")
})

routes.post("/products", ProductsController.create);  
routes.get("/products", ProductsController.list);     
routes.put("/products/:id", ProductsController.update); 
routes.delete("/products/:id", ProductsController.delete); 

routes.post("/categories", CategoriesController.create);  
routes.get("/categories", CategoriesController.list);      
routes.put("/categories/:id", CategoriesController.update); 
routes.delete("/categories/:id", CategoriesController.delete); 


export default routes