import { useContext, useState } from "react";
import { UserContext } from "../context";
import axios from "axios";
import PeopleList from "./cards/PeopleList";
import { toast } from "react-toastify";

const Search = () => {
  const [state, setState] = useContext(UserContext);

  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/search-user/${name}`);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/follow-user", { _id: user._id });
      //Update localstorage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //Update Context
      setState({ ...state, user: data });
      //Update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      toast.success(`You started following ${user.name}`);
    } catch (err) {
      console.log(err);
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
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      toast.error(`You unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form-inline row" onSubmit={searchUser}>
        <div className="col-8">
          <input
            type="search"
            className="form-control"
            onChange={(e) => {
              setName(e.target.value), setResult([]);
            }}
            placeholder="Search"
            value={name}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-outline-primary col-12" type="submit">
            Search
          </button>
        </div>
      </form>
      {result &&
        result.map((user) => (
          <PeopleList
            key={user._id}
            people={result}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
    </>
  );
};

export default Search;
