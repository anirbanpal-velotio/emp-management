import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ErrorTypes } from '../../types/app';
import { IUserAttributes, UserRole } from '../../types/model';
import User from '../user';

export default class LoginService {
    userService:User;
  constructor() {
    this.userService = new User();
  }
  public async loginUser(email: string, password: string):Promise<{token:string, user:IUserAttributes}> {
    const user = await this.userService.getUserByEmail(email)
    const compareResult = await compare(password, user.password!);
    if (!compareResult) {
      throw new Error(ErrorTypes.INCORRECT_CREDENTIAL);
    }
    const token = sign({ id: user.id, role: user.role }, process.env.SECRET_KEY!, {
      expiresIn: '1h'
    });
    delete user.password
    return { token, user };
  }
}
