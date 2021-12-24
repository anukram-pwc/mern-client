import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          setLoading(false);
        }
        if (res.data.success) {
          setEmail("");
          setNewPassword("");
          setSecret("");
          setData(res.data.success);
          setShow(res.data.success);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setLoading(false);
      });
  };

  if (state && state.token) router.push("/");

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>Forgot Password</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgotPasswordForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Modal
            title="Congratulions!"
            visible={show}
            onCancel={() => setShow(false)}
            footer={null}
          >
            {/* Congrats! You can now login */}
            <p>{data}</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
