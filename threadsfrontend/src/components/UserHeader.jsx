import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './UserHeader.module.css';
import defaultPic from '../assets/defaultUserPic.webp';
import UserPost from './UserPost';
import { selectUser } from '../redux/userSlice';

const UserHeader = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUser);
    const [following, setFollowing] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const getUser = async () => {
            if (!username) return; // Prevent fetching if username is missing
    
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
    
                if (data.error) {
                    toast.error(data.error, { position: "top-center",autoClose:500 },);
                    setTimeout(() => navigate('/error'), 500);
                    return;
                }
    
                setUser(data);
                setFollowing(data.followers.includes(currentUser?._id));
            } catch (err) {
                toast.error('Failed to load user profile!');
                setTimeout(() => navigate('/error'), 2000);
            }
        };
    
        getUser();
    }, [username, navigate, currentUser]);
    

    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            toast.error("You need to log in first!");
            return;
        }

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setFollowing(!following); // Toggle follow state
                toast.success(following ? 'Unfollowed!' : 'Followed!',{
                    autoClose:1000
                });
            } else {
                toast.error(data.error || 'Something went wrong!');
            }
        } catch (err) {
            toast.error('Error updating follow status.');
        }
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

    if (!user) return null; // Show nothing while loading user

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <h2 className={styles.name}>{user.name}</h2>
                        <p className={styles.username}>@{user.username}</p>
                        <p className={styles.bio}>{user.bio}</p>
                        <p className={styles.followers}>{user.followers.length || 0} followers</p>
                    </div>
                    <div className={styles.imgCont}>
                        <img src={user.profilePic || defaultPic} alt="Profile" className={styles.avatar} />
                    </div>
                </div>

                <div className={styles.icons}>
                    <FaInstagram className={styles.icon} />
                    <div className={styles.dropdownContainer} ref={dropdownRef}>
                        <BsThreeDots onClick={() => setDropDown(!dropDown)} className={styles.icon} />
                        {dropDown && (
                            <div className={styles.dropMenu}>
                                <button onClick={handleCopyFnx}>Copy profile link</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Show Update Profile or Follow/Unfollow Button */}
                {currentUser?.username === user.username ? (
                    <button className={styles.editButton} onClick={() => navigate('/update')}>
                        Update Profile
                    </button>
                ) : (
                    <button className={styles.followButton} onClick={handleFollowUnfollow}>
                        {following ? 'Unfollow' : 'Follow'}
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
                    <UserPost likes={1200} replies={102} postImg={defaultPic} postTitle="At the beach!" />
                    <UserPost likes={3200} replies={402} postImg={defaultPic} postTitle="Suit karda!" />
                    <UserPost likes={12020} replies={2022} postImg={defaultPic} postTitle="Into the woods!" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default UserHeader;
