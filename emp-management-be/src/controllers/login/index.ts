import express, { Request, Response } from 'express';
import moment from 'moment';
import LoginService from '../../services/login';
import { ErrorTypes } from '../../types/app';

const router = express.Router();
const loginService = new LoginService();
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      throw new Error(ErrorTypes.INVALID_REQUEST_BODY);
    }
    const response = await loginService.loginUser(email, password);
    const { token, user } = response;

    res.status(200).cookie('token', token, {
      sameSite: 'strict',
      path: '/',
      httpOnly: true,
      expires: moment().add(1, 'hour').toDate(),
    }).send({ success: true, user });
  } catch (err: any) {
    console.error(err.message);
    res.status(401).clearCookie('token').send({ success: false, message: err.message });
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  res.status(200).clearCookie('token').send({ success: true });
});

export default router;
