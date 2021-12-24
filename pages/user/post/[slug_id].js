import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../../components/routes/UserRoute";
import PostForm from "../../../components/forms/PostForm";
import { toast } from "react-toastify";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const slug_id = router.query.slug_id;

  useEffect(() => {
    if (slug_id) fetchUserPost();
  }, [slug_id]);

  const fetchUserPost = async () => {
    try {
      const { data } = await axios.get(`/edit-post/${slug_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${slug_id}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.push("/user/dashboard");
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

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>Edit Post</h1>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-8 offset-md-2">
          <PostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
        </div>
      </div>
    </UserRoute>
  );
};
export default EditPost;
