import * as fs from 'fs';
import * as path from 'path';
import { Dialect, Sequelize } from 'sequelize';
import { IDbConnection } from '../types/model';

const db = {} as IDbConnection;

const dbInit = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT as Dialect,
      port: +process.env.DB_PORT!,
      logging: false,
    },
  );

  db.sequelize = sequelize;
  if (sequelize) {
    const basename = path.basename(module.filename);
    fs.readdirSync(__dirname)
      .filter((file) => (
        file !== basename
      ))
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name as keyof IDbConnection] = model;
      });
    return db;
  }

  console.error(
    'Error, Not connecteed to database. Please check the connection!',
  );
  return null;
};

export default db as IDbConnection;
export { dbInit };
