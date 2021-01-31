import React from 'react';
import {Spinner} from 'react-bootstrap';
import styles from './Spinner.module.css'

export default function Spinn() {
    return (
        <div className={styles.wrapper}>
        <Spinner animation="border"  className={styles.spin} />
        </div>
    )
}