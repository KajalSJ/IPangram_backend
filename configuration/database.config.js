import config from "./app.config.js";
import Sequelize from "sequelize";
import * as tedious from "tedious";

const connection = new Sequelize('ipangram_users', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default connection;
