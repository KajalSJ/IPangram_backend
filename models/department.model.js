import { DataTypes } from "sequelize";
import connection from "../configuration/database.config.js";

const departmentModel = connection.define(
  "departments",
  {
    departmentId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default departmentModel;
