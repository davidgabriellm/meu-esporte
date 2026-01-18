import { Model, DataTypes } from "sequelize";

class OrderItem extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        order_id: DataTypes.UUID,
        product_id: DataTypes.UUID,
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
        tableName: "order_items",
        timestamps: true, 
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id" });
    this.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

export default OrderItem;
