import { hash } from 'bcrypt';
import moment from 'moment';
import { Op } from 'sequelize';
import db from '../../models';
import { ErrorTypes, IDeleteUserParams, IUpdateUserParams } from '../../types/app';
import { IUserAttributes, UserRole } from '../../types/model';

export default class User {

  public async createUser(params:IUserAttributes):Promise<IUserAttributes>{
    const {name,email,password,role,age,dateOfJoining} = params;
    const hashedResult = await hash(password!, 5);
    const user:IUserAttributes = {
      name,email,password:hashedResult, role, age,
      dateOfJoining:moment(dateOfJoining).format("YYYY-MM-DD")
    }
    let userResponse:any=null
    try{
      userResponse = await db.users.create(user,{logging: console.log});
      userResponse = JSON.parse(JSON.stringify(userResponse))
    }
    catch(err:any){
      console.error(err.message)
      throw new Error(ErrorTypes.INTERNAL_SERVER_ERROR)
    }
    user.id = userResponse.id
    return user;
  }
  
  public async getUserById(id: number): Promise<IUserAttributes> {
    let userResponse:any=null
    try{
      userResponse = await db.users.findOne({
        where: { id },
        attributes: { exclude: ['password'] }
      });
    }
    catch(err:any){
      console.error(err.message)
      throw new Error(ErrorTypes.INTERNAL_SERVER_ERROR)
    }
    if (!userResponse) {
      throw new Error(ErrorTypes.USER_NOT_FOUND);
    }
    const user = JSON.parse(JSON.stringify(userResponse)) as IUserAttributes;
    return { ...user };
  }

  public async getUserByEmail(email: string): Promise<IUserAttributes> {
    let userResponse:any=null
    try{
      userResponse = await db.users.findOne({
        where: {
          email: {
            [Op.eq]: email
          }
        },
        // logging:console.log
      });
    }
    catch(err:any){
      console.error(err.message)
      throw new Error(ErrorTypes.INTERNAL_SERVER_ERROR)
    }
    if (!userResponse) {
      throw new Error(ErrorTypes.USER_NOT_FOUND);
    }
    const user = JSON.parse(JSON.stringify(userResponse)) as IUserAttributes;
    return { ...user };
  }

  public async getAllUsers(): Promise<IUserAttributes[]> {
    const userResponse = await db.users.findAll({
      attributes: { exclude: ['password'] }
    });
    const users = JSON.parse(JSON.stringify(userResponse)) as IUserAttributes[];
    return users
  }

  public async editUser(params: IUpdateUserParams): Promise<IUserAttributes> {
    const { id, name, role, email, password, age, dateOfJoining, requestedUserId } = params;
    const updatedUser: IUserAttributes = {
      ...(age && {age}),
      ...(dateOfJoining && {dateOfJoining: moment(dateOfJoining).format("YYYY-MM-DD")}),
      ...(role && {role}),
      ...(email &&{email}),
      ...(name && {name})
    }
    if(password){
      const hashedResult = await hash(password!, 5);
      updatedUser.password = hashedResult
    }
    
    let result:any = null;
    try{
      result = await db.users.update(
        {...updatedUser},
        {
          where:{
            [Op.and]:[{id},{role:{
              [Op.ne]:UserRole.ADMIN
            }}]
          },
          logging: console.log
        },
      )
    }
    catch(err:any){
      console.error(err.message)
      throw new Error(ErrorTypes.INTERNAL_SERVER_ERROR)
    }
    if (Array.isArray(result) && result.length > 0 && result[0] > 0) {
      updatedUser.id = id;
      if(updatedUser.password) delete updatedUser.password
      return updatedUser
    } else {
      throw new Error(ErrorTypes.UNAUTHORISED)
    }
  }

  public async deleteUser(params:IDeleteUserParams):Promise<void>{
    const {id, requestedUserId} = params;
    let result:any = null;
    try{
      result = await db.users.destroy(
        {
          where:{
            [Op.and]:[{id},{role:{
              [Op.ne]:UserRole.ADMIN
            }}]
          }
        }
      )
    }
    catch(err:any){
      console.error(err.message)
      throw new Error(ErrorTypes.INTERNAL_SERVER_ERROR)
    }
    if(!result) throw new Error(ErrorTypes.UNAUTHORISED)
  }
}
