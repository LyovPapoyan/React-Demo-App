import React from 'react';
import styles from './Footer.module.css'





export default function Footer() {
    return(
        <div className={styles.container}>
            
            <p className={styles.text}>
            <a href="https://github.com/LyovPapoyan">
                Github: github.com/LyovPapoyan
            </a>
             </p>

            <p className={styles.text}>
            <a href="https://github.com/LyovPapoyan">
                LinkedIn
            </a>
             </p>

            <p className={styles.text}>
                Gmail: lyovapapoyan95@gmail.com
             </p>
        </div>
    )
}