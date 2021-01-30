import React from 'react';
import styles from './About.module.css'

class About extends React.PureComponent {

    render() {

        return (
            <div className={styles.container}>
                <h2 className='text-center mt-4'>About Page</h2>
                <p className={styles.text}>Welcome Todo list site. I am beginner React. js developer and this is my first React. js project
                 and if you will have any question, You can contact me using Gmail, Github or Linkedin (look in the footer of the site). </p>
                <p className={styles.text}>To use the site, you must first register and then you must log in. If you login successfully,
                you will be taken to the home page. There you can create, edit, search, sort and delete tasks.
                <span>Enjoy using this application</span>. I hope you like it :) </p>
            </div>
        )
    }
}

export default About;