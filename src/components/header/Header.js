import "./Header.css";
import { useState, useEffect } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
function Header() {
  const [redirect, setRedirect] = useState(false);
  const [store, setStore] = useState("");
  const history = useHistory();
  return (
    <nav>
      {redirect && <Redirect to="/" />}
      <ul>
        <li>
          <button
            onClick={(e) => {
              history.push("/home");
            }}
          >
            Products
          </button>
        </li>
      </ul>
      <p>Billing System</p>
      <ul className="end-section-nav ">
        <li className="hover-btn">
          {" "}
          <button>
            {localStorage.getItem("login-cred") &&
              JSON.parse(localStorage.getItem("login-cred")).store_name}
          </button>{" "}
        </li>
        <li className="hover-btn">
          {" "}
          <Link to="/receipt">
            <button>Sale Product</button>
          </Link>{" "}
        </li>
        <li className="hover-btn">
          {" "}
          <button
            onClick={(e) => {
              localStorage.clear("login-cred");
              setRedirect(true);
            }}
          >
            Logout
          </button>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
