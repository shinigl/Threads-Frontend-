// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateUser } from "../redux/userSlice";
// import styles from "./UpdateProfilePage.module.css";
// import defaultPic from '../assets/defaultUserPic.webp';
// import usePreviewImg from "../hooks/usePreviewImg";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { FaHome, FaCheck } from "react-icons/fa";

// const UpdateProfilePage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const user = useSelector((state) => state.user);
//     const storedUser = JSON.parse(localStorage.getItem("user")) || {};

//     const [inputs, setInputs] = useState({
//         name: user.name || storedUser.name || "",
//         username: user.username || storedUser.username || "",
//         email: user.email || storedUser.email || "",
//         bio: user.bio || storedUser.bio || "",
//         password: "",
//     });

//     const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        
//         setInputs({
//             name: user.name || storedUser.name || "",
//             username: user.username || storedUser.username || "",
//             email: user.email || storedUser.email || "",
//             bio: user.bio || storedUser.bio || "",
//             password: "",
//         });

//         if (!imgUrl) {
//             setImgUrl(user.profilePic || storedUser.profilePic || defaultPic);
//         }
//     }, [user, localStorage.getItem("user")]);

//     const handleChange = (e) => {
//         setInputs({ ...inputs, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
        
//         try {
//             const updatedUser = {
//                 ...inputs,
//                 profilePic: imgUrl
//             };

//             let res = await fetch(`/api/users/update/${user._id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedUser),
//             });

//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }

//             const data = await res.json();
//             dispatch(updateUser(data.user)); 
//             localStorage.setItem("user", JSON.stringify(data.user));

//             Swal.fire({
//                 icon: "success",
//                 title: "Profile Updated!",
//                 text: "Your profile has been updated successfully.",
//                 timer: 1500,
//                 showConfirmButton: false,
//             }).then(() => {
//                 navigate(-1); // Redirect to previous page
//             });

//             setLoading(false);
//         } catch (err) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Update Failed!",
//                 text: "Something went wrong while updating your profile.",
//             });
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.card}>
//                 <h2 className={styles.title}>User Profile Edit</h2>

//                 <div className={styles.avatarContainer}>
//                     <img
//                         src={imgUrl || user.profilePic || defaultPic}
//                         alt="Profile"
//                         className={styles.avatar}
//                     />
//                     <label className={styles.changeAvatar}>
//                         Change Avatar
//                         <input type="file" accept="image/*" onChange={handleImageChange} />
//                     </label>
//                 </div>

//                 <form onSubmit={handleSubmit} className={styles.form}>
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter full name"
//                         value={inputs.name}
//                         onChange={handleChange}
//                         className={styles.input}
//                     />

//                     <label>Username</label>
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Enter username"
//                         value={inputs.username}
//                         onChange={handleChange}
//                         className={styles.input}
//                     />

//                     <label>Email Address</label>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter email"
//                         value={inputs.email}
//                         onChange={handleChange}
//                         className={styles.input}
//                     />

//                     <label>Bio</label>
//                     <textarea
//                         name="bio"
//                         placeholder="Tell us about yourself..."
//                         value={inputs.bio}
//                         onChange={handleChange}
//                         className={styles.input}
//                         rows="3"
//                     ></textarea>

//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter password"
//                         value={inputs.password}
//                         onChange={handleChange}
//                         className={styles.input}
//                     />

//                     <div className={styles.buttonGroup}>
//                         <button type="button" className={styles.cancelButton} onClick={() => navigate('/')}>
//                             <FaHome size={28} />
//                         </button>

//                         {loading ? (
//                             <button type="button" className={styles.loaderButton} disabled>
//                                 <span className={styles.loader}></span>
//                             </button>
//                         ) : (
//                             <button type="submit" className={styles.submitButton}>
//                                 <FaCheck size={28} />
//                             </button>
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateProfilePage;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";
import styles from "./UpdateProfilePage.module.css";
import defaultPic from "../assets/defaultUserPic.webp";
import usePreviewImg from "../hooks/usePreviewImg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCheck } from "react-icons/fa";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const storedUser = JSON.parse(localStorage.getItem("user-threads")) || {}; // Updated key to match Login.jsx

  const [inputs, setInputs] = useState({
    name: user.name || storedUser.name || "",
    username: user.username || storedUser.username || "",
    email: user.email || storedUser.email || "",
    bio: user.bio || storedUser.bio || "",
    password: "",
  });

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "https://threads-backend-1-so4b.onrender.com";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user-threads")) || {};
    setInputs({
      name: user.name || storedUser.name || "",
      username: user.username || storedUser.username || "",
      email: user.email || storedUser.email || "",
      bio: user.bio || storedUser.bio || "",
      password: "",
    });

    if (!imgUrl) {
      setImgUrl(user.profilePic || storedUser.profilePic || defaultPic);
    }
  }, [user, setImgUrl]); // Removed localStorage.getItem from deps to avoid infinite loop

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = {
        ...inputs,
        profilePic: imgUrl,
      };

      const res = await fetch(`${apiUrl}/api/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send jwt cookie
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP error! Status: ${res.status}`);
      }

      dispatch(updateUser(data.user));
      localStorage.setItem("user-threads", JSON.stringify(data.user)); // Match key from Login.jsx

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate('/'); 
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: err.message || "Something went wrong while updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>User Profile Edit</h2>

        <div className={styles.avatarContainer}>
          <img
            src={imgUrl || user.profilePic || defaultPic}
            alt="Profile"
            className={styles.avatar}
          />
          <label className={styles.changeAvatar}>
            Change Avatar
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={inputs.name}
            onChange={handleChange}
            className={styles.input}
          />

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={inputs.username}
            onChange={handleChange}
            className={styles.input}
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={inputs.email}
            onChange={handleChange}
            className={styles.input}
          />

          <label>Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={inputs.bio}
            onChange={handleChange}
            className={styles.input}
            rows="3"
          ></textarea>

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={inputs.password}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelButton} onClick={() => navigate("/")}>
              <FaHome size={28} />
            </button>

            {loading ? (
              <button type="button" className={styles.loaderButton} disabled>
                <span className={styles.loader}></span>
              </button>
            ) : (
              <button type="submit" className={styles.submitButton}>
                <FaCheck size={28} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;