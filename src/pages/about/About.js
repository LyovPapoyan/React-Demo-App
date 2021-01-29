import React from 'react';
import styles from './About.module.css'

class About extends React.PureComponent {
   
    render() {

        return(
            <div className={styles.container}>
              <div>About Component</div>
            </div>
           
        );
    }
}

export default About;