import { Link } from "react-router-dom";
import "./sign-up.css";

const SignIn = () => {
  return (
    <div className="signup">
      <div className="signup-left-side signin-left-side">
        <h1>Sign In</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>

        <div>
          <button className="signup-button">Sign In</button>
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
