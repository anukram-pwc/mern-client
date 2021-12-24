import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  about,
  setAbout,
  username,
  setUsername,
  profileUpdate,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {profileUpdate === true && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Username</label>
          </small>
          <input
            value={username}
            type="text"
            className="form-control"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      {profileUpdate === true && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">About</label>
          </small>
          <input
            value={about}
            type="text"
            className="form-control"
            placeholder="Write something here..."
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      )}
      {page !== "login" && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Name</label>
          </small>
          <input
            value={name}
            type="text"
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

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
          disabled={profileUpdate}
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">Password</label>
        </small>
        <input
          value={password}
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {page !== "login" && (
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
      )}

      <div className="form-group p-2">
        <button
          disabled={
            profileUpdate
              ? loading
              : page === "login"
              ? !email || !password || loading
              : !name || !email || !password || !secret || loading
          }
          className="btn btn-primary col-12"
        >
          {loading ? <SyncOutlined spin className="py-2" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
