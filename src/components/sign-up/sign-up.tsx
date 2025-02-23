import { Link } from "react-router-dom";
import "./sign-up.css";
import { useContext, useState } from "react";
import { AuthContextValue } from "../auth-context/auth-context";
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
  const { signUp } = useContext(AuthContextValue);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    signUp({ ...data, imageURL: imageUrl });
  };

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
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName", { required: true })}
                placeholder="First Name"
              />
              {errors.firstName && <span>This field is required</span>}
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                placeholder="Last Name"
              />
              {errors.lastName && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              autoComplete="email"
            />
            {errors.email && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              autoComplete="new-password"
            />
            {errors.password && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span>This field is required</span>}
          </div>

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
            {errors.image && <span>This field is required</span>}
            <img src={imageUrl} alt="" className="image-select" />
          </div>

          <select {...register("Gender")} defaultValue="">
            <option value="" disabled>
              Select a gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button type="submit" className="signup-button">
            SignUp
          </button>
        </form>

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
