import 'dotenv/config';
import jwt from 'jsonwebtoken';

interface UserCredentials {
  username: string;
  password:string;
}

const secret: any = process.env.SECRET;

const jwtConfig: object = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (user: UserCredentials) => {
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

export default createToken;