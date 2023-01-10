import { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage()

    if(user){
      setUser(user);
    }
  }, [])
  
  const authenticate = async (username: string, password: string) => {
    const response = await LoginRequest(username, password);

    const payload = { token: response.token, username, password }

    setUser(payload);
    setUserLocalStorage(payload);
  };

  const logout = () => {
    setUser(null)
    setUserLocalStorage(null);
  };

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
};
