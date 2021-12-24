import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import CommentForm from "../../components/forms/CommentForm";

const PostComments = () => {
  const [allComment, setAllComment] = useState({});
  const [comment, setComment] = useState("");
  const [currentpost, setCurrentpost] = useState({});
  const [show, setShow] = useState(false);
  const router = useRouter();

  const slug_id = router.query.slug_id;

  useEffect(() => {
    if (slug_id) fetchComments();
  }, [slug_id]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/edit-post/${slug_id}`);
      setAllComment(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const answer = window.confirm("Are you sure want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${id}`);
      toast.error(data.success);
      router.push("/user/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data } = await axios.put("/like-post", { id });
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (id) => {
    try {
      const { data } = await axios.put("/unlike-post", { id });
      fetchComments();
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
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentpost._id,
        comment,
      });
      setComment("");
      setShow(false);
      fetchComments();
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
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>MYAPP</h1>
        </div>
      </div>
      <div className="container col-md-8 offset-md-2 pt-5">
        <Post
          post={allComment}
          commentsCount={100}
          removeComment={removeComment}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          handleComment={handleComment}
          handleDelete={handleDelete}
        />
      </div>
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center p-5 h5">
          <RollbackOutlined />
        </a>
      </Link>
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
  );
};
export default PostComments;
