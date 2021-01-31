import React from 'react';
import styles from './Footer.module.css'





export default function Footer() {
    return (
        <div className={styles.container}>

            <p >
                <a className={styles.text}
                    href="https://github.com/LyovPapoyan">
                    Github: github.com/LyovPapoyan
            </a>
            </p>

            <p >
                <a className={styles.text}
                    href="mailto:lyovapapoyan95@gmail.com">
                    Gmail: lyovapapoyan95@gmail.com
            </a>

            </p>
            <p >
                <a
                    className={styles.text}
                    href=":https://www.linkedin.com/in/lyovpapoyan">
                    LinkedIn: linkedin.com/in/lyovpapoyan
            </a>
            </p>


        </div>
    )
} 