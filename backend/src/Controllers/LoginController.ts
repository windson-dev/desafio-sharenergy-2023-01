import { Request, Response } from 'express';
import UserService from '../Services/UserService';

const login = async (req: Request, res: Response) => {
  const { token } = await UserService.login(req.body);

  return res.status(200).json({ token });
};


export default { login };