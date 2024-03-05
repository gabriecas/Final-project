import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'final_project',
  username: 'postgres',
  password: 'adm',
  define: {
    underscored: true
  }
})