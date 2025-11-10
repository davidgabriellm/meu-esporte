import { Model, DataTypes } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: {
          type: DataTypes.DECIMAL(10, 2),
          get() {
            const rawValue = this.getDataValue("price");
            return rawValue ? Number(rawValue) : 0;
          },
        },
        stock: DataTypes.INTEGER,
        image_url: DataTypes.STRING,
        category_id: DataTypes.UUID,
      },
      {
        sequelize,
        name: {
          singular: "product",
          plural: "products",
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: "category_id" });
    this.hasMany(models.OrderItem, { foreignKey: "product_id" });
  }
}

export default Product;
