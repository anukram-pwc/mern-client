import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  // Upload Iamge
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/update-profile`, {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          setLoading(false);
        } else {
          //Update localstorage
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = res.data.user;
          localStorage.setItem("auth", JSON.stringify(auth));
          //Update Context
          setState({ ...state, user: res.data.user });
          toast.success(res.data.success);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      toast.success(data.success);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          {/* Upload Profile Image */}
          <div className="d-flex justify-content-center h5">
            <label>
              {image && image.url ? (
                <Avatar size={30} src={image.url} className="mt-1" />
              ) : uploading ? (
                <LoadingOutlined className="mt-2" />
              ) : (
                <CameraOutlined className="mt-2" />
              )}
              <input
                onChange={handleImage}
                type="file"
                accept="images/*"
                hidden
              />
            </label>
          </div>
          <AuthForm
            profileUpdate={true}
            about={about}
            setAbout={setAbout}
            username={username}
            setUsername={setUsername}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
