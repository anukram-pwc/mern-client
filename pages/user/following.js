import { useState, useEffect, useContext } from "react";
import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const Following = () => {
  const [state, setState] = useContext(UserContext);
  //Following User State
  const [people, setPeople] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      fetchFollowing();
    }
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/following-user");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "../images/logo.jpg";
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/unfollow-user", { _id: user._id });
      //Update localstorage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //Update Context
      setState({ ...state, user: data });
      //Update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      toast.error(`You unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    Unfollow
                  </span>
                </div>
              }
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center pt-5 h5">
          <RollbackOutlined />
        </a>
      </Link>
    </div>
  );
};
export default Following;
