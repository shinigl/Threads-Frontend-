import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaTimes, FaImage } from "react-icons/fa";
import styles from "./CreatePostModal.module.css";
import Swal from "sweetalert2";
import usePreviewImg from "../hooks/usePreviewImg";

const CreatePostModal = ({ closeModal }) => {
  const user = useSelector((state) => state.user);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);

  const maxCharacters = 500;
  const handleTextChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setPostText(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!postText && !imgUrl) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Post text or image is required!",
      });
      setLoading(false);
      return;
    }

    try {
      const postData = {
        postedBy: user._id, // Verifying user ID
        text: postText,
        img: imgUrl, 
      };

      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Post created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <FaTimes className={styles.closeIcon} onClick={closeModal} />
        <h2>Create Post</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            placeholder="What's on your mind?"
            value={postText}
            onChange={handleTextChange}
            className={styles.textarea}
          ></textarea>
          <p className={styles.wordLimit}>{postText.length}/{maxCharacters}</p>

          <label className={styles.uploadLabel}>
            <FaImage className={styles.uploadIcon} />
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {imgUrl && <img src={imgUrl} alt="Preview" className={styles.previewImage} />}

          <div className={styles.buttonGroup}>
            {loading ? (
              <button type="button" className={styles.loaderButton} disabled>
                <span className={styles.loader}></span>
              </button>
            ) : (
              <button type="submit" className={styles.submitButton}>Post</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
