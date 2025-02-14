import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


// Types all

type SignUpFunction = (data: signUpDataType) => void;
type SignInFunction = (data: signInDataType) => void;
type LogOutFunction = () => void;

export const AuthContextValue = createContext<{
  signUp: SignUpFunction;
  signIn: SignInFunction;
  logOut : LogOutFunction;
  loginData: CheckStateDataType | null; // Store user data here
}>({
  signUp: () => {},
  signIn: () => {},
  loginData: null, // Default value for loginData
  logOut : () => {},
});

interface AuthContextProps {
  children: React.ReactNode;
}

type signUpDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageURL: string;
};

type signInDataType = {
  email: string;
  password: string;
};

type CheckStateDataType = {
  name: string;
  email: string;
  image:string;
};


//Start Function

const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  
  //============= Navigate ============
  const navigate = useNavigate();


  // ================ SignUp =======================
  const signUp = (data: signUpDataType) => {
    const { firstName, lastName , email, password , confirmPassword } = data;
    if (!firstName || !lastName || !password || !email ||!confirmPassword ) {
      alert("Empty field");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    const userStringData = localStorage.getItem("SignUp");
    const registrationData = userStringData ? JSON.parse(userStringData) : [];

    let userExist = false;
    registrationData.forEach((user: any) => {
      if (data.email === user.email) {
        userExist = true;
      }
    });

    if (userExist) {
      alert("This email is already exit");
    } else {
      localStorage.setItem(
        "SignUp",
        JSON.stringify([...registrationData, data])
      );
      alert("User Registration Successful");
      navigate("sign-in");
    }
  };

  //===================== Sign In ============================
  const signInDataFromStorageString = localStorage.getItem("SignIn");
  const signInStorage = signInDataFromStorageString ? JSON.parse(signInDataFromStorageString) : null;
  const [loginData, setLoginData] = useState<CheckStateDataType | null>(signInStorage);
  
  const signIn = (data: signInDataType) => {
    const { email, password } = data;
    if (!password || !email) {
      alert("Empty field");
      return;
    }

    const userStringData = localStorage.getItem("SignUp");
    const registrationData = userStringData ? JSON.parse(userStringData) : [];

    const availableUser = registrationData.find(
      (user: signInDataType) => user.email === data.email
    );

    if (availableUser) {
      // If user found, check if passwords match
      if (data.password === availableUser.password) {
        localStorage.setItem(
          "SignIn",
          JSON.stringify({
            name: `${availableUser.firstName} ${availableUser.lastName}`,
            email: availableUser.email,
            image : availableUser.imageURL,
          })
        );
        setLoginData({
          name: `${availableUser.firstName} ${availableUser.lastName}`,
          email: availableUser.email,
          image : availableUser.imageURL,
        })
        alert("Login Successful")
        navigate("/");
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("User not found");
    }
  };


  
  //===================== Log Out ===========================
  const logOut = () => {
    localStorage.removeItem("SignIn");
    setLoginData(null)
  }

  //============= Check Auth State ===================
  // const checkState = () => {
  //   const userStringData = localStorage.getItem("SignIn");
  //   const registrationData = userStringData ? JSON.parse(userStringData) : null;
  //   setLoginData(registrationData);
  // };
  // useEffect(() => {
  //   checkState();
  // }, []);



  return (
    <div>
     
      <AuthContextValue.Provider value={{ signUp, signIn, loginData , logOut }}>
        {children}
      </AuthContextValue.Provider>
    
    </div>
  );
};

export default AuthContext;
