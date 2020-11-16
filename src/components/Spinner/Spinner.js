import React from 'react';
import {Spinner} from 'react-bootstrap';
import styles from './Spinner.module.css'

export default function Spinn() {
    return (
        <Spinner animation="border"  className={styles.spin} />
    )
}