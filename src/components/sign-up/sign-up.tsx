import { Link } from "react-router-dom";
import "./sign-up.css";
import { useContext, useState } from "react";
import { AuthContextValue } from "../auth-context/auth-context";
// ============= React Hook Form ==============
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
  Gender: "male" | "female";
};

const SignUp = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  //============ Context Api ================
  const { signUp } = useContext(AuthContextValue);

  // ================= React Hook Form ===============
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    signUp({ ...data, imageURL: imageUrl });
    console.log(errors);
    
  };

  //  ============== Process image upload ================
  const processImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files ? e.target.files[0] : null;

    if (img) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        if (fileReader.result) {
          setImageUrl(fileReader.result.toString());
        }
      };
    }
  };

  return (
    <div className="signup">
      <div className="signup-left-side">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>SignUp</h1>
          <div className="signup-name">
            {/* First Name */}
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName", { required: true })}
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="confirmPassword"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password"
            />
          </div>

          {/* Image Container */}
          <div className="signup-image-container">
            <label>Select your image</label>
            <input
              type="file"
              {...register("image", {
                required: true,
                onChange: (e) => processImage(e),
              })}
              accept="image/*"
            />
          </div>

          {/* Selector */}
          <select {...register("Gender")}>
            <option disabled selected>
              Select a gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Button */}
          <input type="submit" className="signup-button" />
        </form>

        {/* Paragraph */}
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





















// import { Link } from "react-router-dom";
// import "./sign-up.css";
// import { useContext, useState } from "react";
// import { AuthContextValue } from "../auth-context/auth-context";

// const SignUp = () => {

//   //============ Context Api =========
//   const {signUp} = useContext(AuthContextValue);

//   const [inputs, setInputs] = useState({
//     firstName:'',
//     lastName:'',
//     email:'',
//     password:'',
//     confirmPassword:'',
//   });

// const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//  setInputs({...inputs,[e.target.name] : e.target.value})
// }

//   return (
//     <div className="signup">
//       <div className="signup-left-side">
//         <h1>SignUp</h1>
//         <div className="signup-name">
//           <div>
//             <label htmlFor="firstName">First Name</label>
//             <input type="text" id="firstName" placeholder="First Name" onChange={handleInput} name='firstName'/>
//           </div>
//           <div>
//             <label htmlFor="lastName">Last Name</label>
//             <input type="text" id="lastName" placeholder="Last Name" onChange={handleInput} name='lastName'/>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" placeholder="Email" onChange={handleInput} name='email'/>
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" placeholder="Password" onChange={handleInput} name='password'/>
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             placeholder="Confirm Password"
//             name='confirmPassword'
//             onChange={handleInput}
//           />
//         </div>
//         <div>
//           <button className="signup-button" onClick={()=>{signUp(inputs)}}>SignUp</button>
//         </div>
//         <p className="signup-para">
//           Already have an account{" "}
//           <Link to="/sign-in" className="link-tag">
//             SignIn
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
