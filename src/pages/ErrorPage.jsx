import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import errorImg from '../assets/errorlogo.png'

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.errorContainer}>
            <img src={errorImg} alt="Error" className={styles.errorImg} />
            <h2 className={styles.errorTitle}>Oops! Page Not Available or</h2>
            <p className={styles.errorMessage}>The user profile you are looking for does not exist or has been removed.</p>
            <button className={styles.homeBtn} onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

export default ErrorPage;
