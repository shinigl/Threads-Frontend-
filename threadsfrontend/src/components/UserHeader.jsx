import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to get user state
import styles from './UserHeader.module.css';
import pfp from '../assets/pfp.png';
import post1 from '../assets/post1.png';
import post2 from '../assets/post2.png';
import UserPost from './UserPost';
import { useParams } from 'react-router-dom';
import { selectUser } from '../redux/userSlice'; // Import Redux selector
import defaultPic from '../assets/defaultUserPic.webp';

const UserHeader = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUser); // Get logged-in user from Redux

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error, { position: "top-center" });

                    setTimeout(() => {
                        navigate('/error');
                    }, 2000);
                    return;
                }
                setUser(data);
            } catch (err) {
                toast.error('Failed to load user profile!');
                setTimeout(() => {
                    navigate('/error');
                }, 2000);
            }
        };
        getUser();
    }, [username, navigate]);

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

    if (!user) {
        return null; // Show nothing while loading user
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <h2 className={styles.name}>{user.name}</h2>
                        <p className={styles.username}>@{user.username}</p>
                        <p className={styles.bio}>{user.bio}</p>
                        <p className={styles.followers}>{user.followers || 0} followers</p>
                    </div>
                    <div className={styles.imgCont}>
                        <img src={user.profilePic || defaultPic } alt="Profile" className={styles.avatar} />
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

                {/* Show Update Profile or Follow Button */}
                {currentUser?.username === user.username ? (
                    <button
                        className={styles.editButton}
                        onClick={() => navigate('/update')}
                    >
                        Update Profile
                    </button>
                ) : (
                    <button className={styles.followButton}>
                        Follow
                    </button>
                )}

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
                    <UserPost likes={1200} replies={102} postImg={pfp} postTitle="At the beach!" />
                    <UserPost likes={3200} replies={402} postImg={post1} postTitle="Suit karda!" />
                    <UserPost likes={12020} replies={2022} postImg={post2} postTitle="Into the woods!" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default UserHeader;
