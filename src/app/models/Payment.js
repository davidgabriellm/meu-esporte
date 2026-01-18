import { Model, DataTypes } from "sequelize";

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        order_id: DataTypes.UUID,
        method: DataTypes.STRING,
        amount: DataTypes.DECIMAL(10, 2),
        status: DataTypes.STRING,

        checkout_session_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        name: {
          singular: "payment",
          plural: "payments",
        },
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  }
}

export default Payment;
