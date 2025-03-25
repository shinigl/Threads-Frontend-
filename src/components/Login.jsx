// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";
// import { showSignUp } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import logo from "../assets/logo.svg";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import Swal from "sweetalert2";

// const Login = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const apiUrl = import.meta.env.VITE_API_URL || "https://threads-backend-1-so4b.onrender.com";
//   const handleLogin = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/api/users/login`, {
//         method: "POST",
//         credentials: "include", // Send jwt cookie
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(inputs),
//       });

//       const data = await res.json();

//       if (data.error || data.message) {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: data.error || data.message || "Invalid credentials",
//           confirmButtonText: "Try Again",
//         });
//         return;
//       }

//       dispatch(setUser(data));
//       localStorage.setItem("user-threads", JSON.stringify(data));

//       Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         text: "Redirecting to Home page...",
//         timer: 1500,
//         showConfirmButton: false,
//       }).then(() => {
//         navigate("/");
//         navigate(0); // Refresh to ensure state updates
//       });
//     } catch (error) {
//       console.error("Error logging in:", error.message);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "Please check your connection and try again.",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleLogin();
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.loginBox}>
//         <img className={styles.logo} src={logo} alt="Logo" />
//         <p className={styles.tagline}>Welcome back</p>

//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             onChange={handleChange}
//             value={inputs.username}
//             className={styles.input}
//             required
//           />
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={inputs.password}
//               className={styles.input}
//               required
//             />
//             <span
//               className={styles.eyeIcon}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </span>
//           </div>

//           <button type="submit" className={styles.loginButton}>
//             Log In
//           </button>
//         </form>

//         <p className={styles.signupText}>
//           Don't have an account?{" "}
//           <span onClick={() => dispatch(showSignUp())} className={styles.link}>
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { showSignUp } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../assets/logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const apiUrl = import.meta.env.VITE_API_URL || "https://threads-backend-1-so4b.onrender.com";

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Start loading
      const res = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (data.error || data.message) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || data.message || "Invalid credentials",
          confirmButtonText: "Try Again",
        });
        return;
      }

      dispatch(setUser(data));
      localStorage.setItem("user-threads", JSON.stringify(data));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to Home page...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
        navigate(0);
      });
    } catch (error) {
      console.error("Error logging in:", error.message);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your connection and try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <p className={styles.tagline}>Welcome back</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={inputs.username}
            className={styles.input}
            required
          />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={inputs.password}
              className={styles.input}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <span className={styles.loader}>Loading...</span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className={styles.signupText}>
          Don't have an account?{" "}
          <span onClick={() => dispatch(showSignUp())} className={styles.link}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

