import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import UserModel from '../Models/UserModel';
import bcrypt from 'bcrypt';

const isValidLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const { error } = Joi.object({
    username: Joi.string().not().empty()
      .required(),
    password: Joi.string().not().empty()
      .required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const existUser = await UserModel.findOne({ username });

  if (!existUser) return res.status(400).json({ message: 'Username or password invalid' });

  const validPassword = await bcrypt.compare(password, existUser.password);

  if (!validPassword) return res.status(400).json({ message: 'Username or password invalid' });

  return next();
};

export default isValidLogin;
