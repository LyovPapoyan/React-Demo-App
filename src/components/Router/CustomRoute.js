import React from 'react';
import {connect} from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function CustomRoute(props) {
  const {isAuth, path, type = 'public', exact, component: Component} = props;
  return (
   <Route path={path} exact={exact} render={(prop) => {
       if(type === 'private') {
        return(
               isAuth ? 
                <Component {...prop}/> :
                <Redirect to='/login'/>
       )
       } else {
        return(
               !isAuth ? 
                <Component {...prop}/> :
                <Redirect to='/'/>
        )
       }
      
   }} />
  )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

CustomRoute.propTypes = {
    type: PropTypes.oneOf(['public', 'private']),
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(CustomRoute)