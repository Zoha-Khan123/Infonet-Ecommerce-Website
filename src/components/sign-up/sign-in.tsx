import { Link, useNavigate } from "react-router-dom";
import "./sign-up.css";
import { useContext, useEffect, useState } from "react";
import { AuthContextValue } from "../auth-context/auth-context";

const SignIn = () => {
  //============ Context Api ===========
  const { signIn, loginData } = useContext(AuthContextValue);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //============= Navigate ================
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData) {
      // If user is logged in, and is not on the sign-in page, redirect to the home page
      if (window.location.pathname === "/sign-in") {
        navigate("/");
      }
    } else {
      console.log("No data found, user is not logged in.");
    }
  }, [loginData, navigate]);


  //============ Handle inputs ============
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup">
      <div className="signup-left-side signin-left-side">
        <h1>Sign In</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleInput}
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleInput}
            name="password"
          />
        </div>

        <div>
          <button
            className="signup-button"
            onClick={() => {
              signIn(inputs);
            }}
          >
            Sign In
          </button>
        </div>
        <p className="signup-para">
          Don't have an account
          <Link to="/sign-up" className="link-tag">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
