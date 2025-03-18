import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice"; // Redux action to update user data
import styles from "./UpdateProfilePage.module.css";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();

  // Fetch user data from Redux store
  const user = useSelector((state) => state.user);
  
  // If Redux store is empty, check localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // Initialize state with user data
  const [inputs, setInputs] = useState({
    name: user.name || storedUser.name || "",
    username: user.username || storedUser.username || "",
    email: user.email || storedUser.email || "",
    bio: user.bio || storedUser.bio || "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(user.profilePic || storedUser.profilePic || null);
  const defaultAvatar = "https://via.placeholder.com/100"; // Default avatar image

  useEffect(() => {
    // If Redux updates, sync state
    setInputs({
      name: user.name || storedUser.name || "",
      username: user.username || storedUser.username || "",
      email: user.email || storedUser.email || "",
      bio: user.bio || storedUser.bio || "",
      password: "",
    });
    setProfilePic(user.profilePic || storedUser.profilePic || null);
  }, [user]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated user data
    const updatedUser = { ...inputs, profilePic };

    // Save to Redux store
    dispatch(updateUser(updatedUser));

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    console.log("Updated Info:", updatedUser);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>User Profile Edit</h2>

        <div className={styles.avatarContainer}>
          <img
            src={profilePic || defaultAvatar}
            alt="Profile"
            className={styles.avatar}
          />
          <label className={styles.changeAvatar}>
            Change Avatar
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={inputs.name}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label>Username *</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={inputs.username}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={inputs.email}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label>Bio *</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={inputs.bio}
            onChange={handleChange}
            className={styles.input}
            rows="3"
            required
          ></textarea>

          <label>Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={inputs.password}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
