import { DataTypes } from "sequelize";
import connection from "../configuration/database.config.js";

const userModel = connection.define(
  "users",
  {
    userId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: "user",
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    hobbies: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    loginToken: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    categoryName:{
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location:{
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    salary:{
      type: DataTypes.NUMBER,
    }
  },
  {
    timestamps: false,
  }
);

export default userModel;
