import {
  LoginResponse,
  useAuthenticationStore,
} from "@/services/authentication";
import Router from "next/router";
import { createContext } from "react";

interface AuthenticatedContextProps {
  logged: boolean;
  user?: LoginResponse | null;
}

const AuthenticatedContext = createContext<AuthenticatedContextProps>({
  logged: false,
});

export const AuthenticatedProvider = (props: { children: React.ReactNode }) => {
  const { user, hydrated } = useAuthenticationStore();
  const logged = !!user;

  if (!hydrated) return null;
  if (!logged) Router.push("/login");

  return (
    <AuthenticatedContext.Provider value={{ logged, user }}>
      {props.children}
    </AuthenticatedContext.Provider>
  );
};

export default AuthenticatedContext;
