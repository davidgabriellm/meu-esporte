import { Model, DataTypes } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        user_id: DataTypes.UUID,
        address_id:DataTypes.UUID,
        total: DataTypes.DECIMAL(10, 2),
        status: DataTypes.STRING
      },
      {
        sequelize,
         name: {
          singular: "order",
          plural: "orders",
        },
      }
    );
  }

 static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Address, { foreignKey: "address_id", as: "address" });
    

    this.hasMany(models.OrderItem, { foreignKey: "order_id", as: "items" });
    this.hasOne(models.Payment, { foreignKey: "order_id", as: "payment" });
}
}

export default Order;