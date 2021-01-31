import React from 'react';
import styles from './Not-found.module.css'

class NotFound extends React.PureComponent {
   
    render() {

        return(
            <div className={styles.container}>
              <h1 className='text-center mt-5' >404</h1>
              <h4 className='text-center '>Page is Not-found</h4>
            </div>
        );
    }
}

export default NotFound;