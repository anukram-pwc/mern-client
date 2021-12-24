const CommentForm = ({ addComment, comment, setComment }) => {
  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        placeholder="Write your comment..."
        className="form-control"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-primary btn-block btn-sm mt-3">Submit</button>
    </form>
  );
};
export default CommentForm;
