import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group p-2">
        <small>
          <label className="text-muted">Email</label>
        </small>
        <input
          value={email}
          type="email"
          className="form-control"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">New Password</label>
        </small>
        <input
          value={newPassword}
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
        <>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">Select a security question</label>
            </small>
            <select className="form-control">
              <option>What is your first phone number?</option>
              <option>What is your pet name?</option>
              <option>What is your favourite colour?</option>
              <option>Which city you were born?</option>
              <option>What is your first school name?</option>
            </select>
            <small className="form-text text-muted">
              Remember this to reset your password if forgotten.
            </small>
          </div>

          <div className="form-group p-2">
            <input
              value={secret}
              type="text"
              className="form-control"
              placeholder="Write your answer here..."
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
        </>

      <div className="form-group p-2">
        <button
          disabled={!email || !newPassword || !secret || loading}
          className="btn btn-primary col-12"
        >
          {loading ? <SyncOutlined spin className="py-2" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
