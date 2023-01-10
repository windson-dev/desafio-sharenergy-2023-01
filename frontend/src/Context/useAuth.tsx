import { useContext } from "react";
import { AuthContext } from "./LoginContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
