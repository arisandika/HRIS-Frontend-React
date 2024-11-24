/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validate, setValidate] = useState([]);

  const register = async (e) => {
    e.preventDefault();

    await api
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
      })

      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        const validationErrors = {};

        errors.forEach((error) => {
          validationErrors[error.path] = error.msg;
        });
        setValidate(validationErrors);
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <Card className="mx-auto w-[28rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={register}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {validate.name && (
                  <small className="text-red-500">{validate.name}</small>
                )}
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {validate.password && (
                  <small className="text-red-500">{validate.password}</small>
                )}
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
