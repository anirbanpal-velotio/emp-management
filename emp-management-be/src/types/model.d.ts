
import { Model } from 'sequelize';

export const enum UserRole {
  DEVELOPER = 'DEVELOPER',
  QA = 'QA',
  DEVOPS = 'DEVOPS',
  ADMIN = 'ADMIN'
}

export interface IUserAttributes {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  dateOfJoining?: Date|string;
  age?: number;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IDbConnection{
  users: any;
  sequelize: any;
}
