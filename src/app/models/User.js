import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
      }
    );

    this.addHook("beforeValidate", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
    this.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
  }
}

export default User;
