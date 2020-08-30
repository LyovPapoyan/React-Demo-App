import React from 'react';
import User from './User';

const UserList = () => {
    return (
        <ul>
            <li> <User name='John' surName='Smith'/> </li>
            <li> <User name='Bob' surName='Jackson'/> </li>
            <li> <User name='Sarah' surName='Conor'/> </li>
            
        </ul>
    );
}

export default UserList;