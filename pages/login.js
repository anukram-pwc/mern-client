import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          setLoading(false);
        } else {
          setEmail("");
          setPassword("");
          setLoading(false);
          // Update Context
          setState({
            user: res.data.user,
            token: res.data.token,
          });
          // Save localstorage
          window.localStorage.setItem("auth", JSON.stringify(res.data));
          router.push("/user/dashboard");
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };

  if (state && state.token) router.push("/user/dashboard");

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            <Link href="/forgot-password">
              <a className="text-danger">Forgot password?</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
