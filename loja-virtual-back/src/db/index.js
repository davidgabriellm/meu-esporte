import Sequelize from "sequelize";
import config from "../config/database"
import User from "../app/models/User";
import Product from "../app/models/Product";
import Payment from "../app/models/Payment";
import OrderItem from "../app/models/OrderItem"
import Order from "../app/models/Order"
import Category from "../app/models/Category"
import CartItem from "../app/models/CartItem"
import Address from "../app/models/Address"




const models = [User, Product, Payment, OrderItem, Order, Category, CartItem, Address]

class Database {
    constructor() {
    this.connection = new Sequelize(config);

    this.initModels()
    this.assosiate()
  }
  initModels() {
    models.forEach(model => model.init(this.connection))
  }
  assosiate(){
    models.forEach(model => {
      if(model.associate) model.associate(this.connection.models);
    })
  }
}

export default new Database()