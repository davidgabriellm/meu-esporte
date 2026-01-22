import Sequelize from "sequelize";
import config from "../config/database.js"
import User from "../app/models/User.js";
import Product from "../app/models/Product.js";
import Payment from "../app/models/Payment.js";
import OrderItem from "../app/models/OrderItem.js"
import Order from "../app/models/Order.js"
import Category from "../app/models/Category.js"
import CartItem from "../app/models/CartItem.js"
import Address from "../app/models/Address.js"




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