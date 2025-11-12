import { Model, DataTypes } from "sequelize";

class CartItem extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        product_id: DataTypes.UUID,
        quantity: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "cart_items",
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
   this.belongsTo(models.User, { foreignKey: "user_id" });
   this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });;
  }
}

export default CartItem;
