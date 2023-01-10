import UserModel from '../Models/UserModel';
import createToken from '../Auth/jwtConfig';

const login = async ({ username }: any) => {
  const getUsernameData = await UserModel.findOne({ username });

  const token = createToken(getUsernameData);

  return { token };
}

export default { login };
