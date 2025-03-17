import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import styles from './UserHeader.module.css';
import pfp from '../assets/pfp.png';
import post1 from '../assets/post1.png'
import post2 from '../assets/post2.png'
import UserPost from './UserPost';


const UserHeader = () => {
    const [dropDown, setDropDown] = useState(false);
    const dropdownRef = useRef(null);

    const onThreeDotsClick = () => {
        setDropDown(!dropDown);
    };

    const handleCopyFnx = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Profile link copied!', {
            position: 'top-right',
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'dark',
        });
        setDropDown(false);
    };


    return (
        <>
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.info}>
                    <h2 className={styles.name}>Aniket Kumar</h2>
                    <p className={styles.username}>shinigl_</p>
                    <p className={styles.bio}>
                        Education wise an Engineer who likes making videos
                    </p>
                    <p className={styles.followers}>363 followers</p>
                </div>
                <div className={styles.imgCont}>
                    <img src={pfp} alt="Profile" className={styles.avatar} />
                </div>
            </div>

            <div className={styles.icons}>
                <FaInstagram className={styles.icon} />
                <div className={styles.dropdownContainer} ref={dropdownRef}>
                    <BsThreeDots onClick={onThreeDotsClick} className={styles.icon} />
                    {dropDown && (
                        <div className={styles.dropMenu}>
                            <button onClick={handleCopyFnx}>Copy profile link</button>
                        </div>
                    )}
                </div>
            </div>

            <button className={styles.editButton}>Edit profile</button>
            <div className={styles.threadsContainer}>
            <div className={styles.threads}>
                <p>Threads</p>
                <div className={styles.threadsLine}></div>
            </div>
            <div className={styles.replies}>
                <p>Replies</p>
                <div className={styles.replyLine}></div>
            </div>
            </div>
            {/* Showing posts here */}
            <div className={styles.usersPost}>
            <UserPost likes={1200} replies={102} postImg={pfp} postTitle="At the beach!"/>
            <UserPost likes={3200} replies={402} postImg={post1} postTitle="Suit karda!"/>
            <UserPost likes={12020} replies={2022} postImg={post2} postTitle="Into the woods!"/>
           
            </div>
        </div>
        <ToastContainer />
        </>
    );
};

export default UserHeader;
