import { useAuthenticationStore } from "@/services/authentication";
import Router from "next/router";

const Login = () => {
  const { login, loading, error } = useAuthenticationStore();

  const handleLogin = async () => {
    await login("username", "password");
    if (error) {
      console.error("Login failed:", error);
    } else {
      Router.push("/");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login{" "}
      </button>
    </div>
  );
};

export default Login;
