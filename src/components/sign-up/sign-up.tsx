import { Link } from "react-router-dom";
import "./sign-up.css";
import { useContext, useState } from "react";
import { AuthContextValue } from "../auth-context/auth-context";


const SignUp = () => {

  //============ Context Api =========
  const {signUp} = useContext(AuthContextValue);
  

  const [inputs, setInputs] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
  });

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
 setInputs({...inputs,[e.target.name] : e.target.value})
}








  return (
    <div className="signup">
      <div className="signup-left-side">
        <h1>SignUp</h1>
        <div className="signup-name">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="First Name" onChange={handleInput} name='firstName'/>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Last Name" onChange={handleInput} name='lastName'/>
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" onChange={handleInput} name='email'/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" onChange={handleInput} name='password'/>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            name='confirmPassword'
            onChange={handleInput}
          />
        </div>
        <div>
          <button className="signup-button" onClick={()=>{signUp(inputs)}}>SignUp</button>
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
