import { Link } from "react-router-dom";
import "./sign-up.css";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup-left-side">
        <h1>SignUp</h1>
        <div className="signup-name">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="First Name" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Last Name" />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button className="signup-button">SignUp</button>
        </div>
        <p className="signup-para">
          Already have an account{" "}
          <Link to="/sign-in" className="link-tag">
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
