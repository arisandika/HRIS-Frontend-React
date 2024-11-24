import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validate, setValidate] = useState({});
  const [loginFailed, setLoginFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length >= 8) {
      setValidate((prev) => ({ ...prev, password: "" }));
    } else {
      setValidate((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/api/login", {
        email: email,
        password: password,
      });
      Cookies.set("token", response.data.data.token);
      Cookies.set("user", JSON.stringify(response.data.data.user));
      setIsAuthenticated(true);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const errorData = err.response.data;
      const validationErrors = {};

      if (errorData.errors) {
        errorData.errors.forEach((error) => {
          validationErrors[error.path] = error.msg;
        });
        setValidate(validationErrors);
      }

      setLoginFailed(errorData.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <Card className="mx-auto w-[28rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {loginFailed && <small className="text-red-500">{loginFailed}</small>}
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {validate.email && (
                  <small className="text-red-500">{validate.email}</small>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="inline-block ml-auto text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                {validate.password && (
                  <small className="text-red-500">{validate.password}</small>
                )}
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? <div className="spinner"></div> : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
