import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import PeopleList from "../../components/cards/PeopleList";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  // Follow people state
  const [people, setPeople] = useState([]);
  //Add Comment state
  const [comment, setComment] = useState("");
  const [currentpost, setCurrentpost] = useState({});
  const [show, setShow] = useState(false);
  //Pagination
  const [totalpost, setTotalpost] = useState(0);
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      fetchPeople();
    }
  }, [state && state.token, page]);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/post-count");
      setTotalpost(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Follow people List
  const fetchPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-post", { content, image });
      if (data.error) {
        toast.error(data.error);
      } else {
        setPage(1);
        newsFeed();
        toast.success(data.success);
        setContent("");
        setImage({});
      }
    } catch (err) {
      toast.error(err);
    }
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

  const handleDelete = async (id) => {
    try {
      const answer = window.confirm("Are you sure want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${id}`);
      toast.error(data.success);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  //Follow People function
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
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      //re render post
      newsFeed();
      toast.success(`You started following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data } = await axios.put("/like-post", { id });
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (id) => {
    try {
      const { data } = await axios.put("/unlike-post", { id });
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setShow(false);
    setComment("");
  };

  const handleComment = async (post) => {
    setCurrentpost(post);
    setShow(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("current post id ===> ", currentpost._id);
    // console.log("my coment ===> ", comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentpost._id,
        comment,
      });
      // console.log("add comment ===>", data);
      setComment("");
      setShow(false);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure want to delete?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      toast.error(data.success);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleComment={handleComment}
              removeComment={removeComment}
            />
            <Pagination
              current={page}
              total={(totalpost / 2) * 10}
              onChange={(value) => setPage(value)}
              className="pb-5"
            />
          </div>

          <div className="col-md-4">
            <Search />
            <br />
            {state && state.user && state.user.following && (
              <Link href="/user/following">
                <a className="h6">{state.user.following.length} Following</a>
              </Link>
            )}
            <PeopleList people={people} handleFollow={handleFollow} />
          </div>
        </div>

        <Modal
          visible={show}
          onCancel={closeModal}
          title="Add your comment"
          footer={null}
        >
          <CommentForm
            addComment={addComment}
            comment={comment}
            setComment={setComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
