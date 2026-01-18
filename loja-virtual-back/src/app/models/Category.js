import { Model, DataTypes } from "sequelize";

class Category extends Model {
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
      },
      {
        sequelize,
         name: {
          singular: "category",
          plural: "categories",
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: "category_id" });
  }
}

export default Category;
