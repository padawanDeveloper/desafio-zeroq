import React from "react";
import styles from "./Loading.module.css";

const LoadingSpinner = () => {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default LoadingSpinner;
