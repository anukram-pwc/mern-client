import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar } from "antd";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");
  const router = useRouter();

  const logOut = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <nav
      className="nav d-flex justify-content-between"
      style={{ backgroundColor: "blue" }}
    >
      <Link href={state === null ? "/" : "/user/dashboard"}>
        <a
          className={`nav-link text-light logo ${current === "/" && "active"}`}
        >
          <Avatar src={"../images/logo.jpg"} /> MYAPP
        </a>
      </Link>

      {state === null ? (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light ${
                current === "/login" && "active"
              }`}
            >
              Login
            </a>
          </Link>

          <Link href="/register">
            <a
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
        </>
      ) : (
        <>
          <div className="dropdown">
            <a
              className="btn dropdown-toggle text-light"
              role="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link href="/user/dashboard">
                  <a
                    className={`nav-link dropdown-item ${
                      current === "/user/dashboard" && "active"
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/user/profile/update">
                  <a
                    className={`nav-link dropdown-item ${
                      current === "/user/profile/update" && "active"
                    }`}
                  >
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <a onClick={logOut} className="nav-link dropdown-item">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
