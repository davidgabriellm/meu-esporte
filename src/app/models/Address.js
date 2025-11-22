import { Model, DataTypes } from "sequelize";

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        user_id: DataTypes.UUID,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING
      },
      {
        sequelize,
        name: {
          singular: "address",
          plural: "addresses",
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.hasMany(models.Order, {foreignKey: "address_id", as: "orders" })
  }
}

export default Address;
