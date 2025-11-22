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
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Address, { foreignKey: "address_id" }); 
    this.hasMany(models.OrderItem, { foreignKey: "order_id" });
    this.hasOne(models.Payment, { foreignKey: "order_id" });
  }
}

export default Order;