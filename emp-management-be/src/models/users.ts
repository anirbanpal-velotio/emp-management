import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUserAttributes,UserRole } from '../types/model';
class Users extends Model<IUserAttributes> {
}
module.exports= (sequelize: Sequelize) => {
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isNumeric: true,
        },
        field:'id'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 30],
        },
        field: 'name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        field:'email'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      role: {
        type: DataTypes.ENUM(UserRole.DEVELOPER, UserRole.DEVOPS, UserRole.QA, UserRole.ADMIN),
        field: 'role'
      },
      age:{
        type: DataTypes.INTEGER,
        field: 'age',
        allowNull:false,
      },
      dateOfJoining:{
        type: DataTypes.DATEONLY,
        field:'date_of_joining',
        allowNull:false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'users',
      tableName: 'users',
    },
  );

  return Users;
};
