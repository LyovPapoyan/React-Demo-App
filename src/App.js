import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Menu from './components/Menu/Menu'
// import Search from './components/Search/Search'
import ToDo from './pages/Todo/ToDo';
import About from './pages/about/About';
import Contact from './pages/contacts/Contact';
import NotFound from './pages/not-found/Not-found';
import SingleTask from './pages/singleTask/SingleTask';
import Spinner from './components/Spinner/Spinner'
// import  './components/Spinner/Spinner.module.css'

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';



class App extends React.PureComponent {

  componentDidUpdate() {
    const {errorMessage, successMessage, authSuccessMessage} = this.props;

    if(errorMessage) {
      toast.error(errorMessage);
    }

    if(successMessage) {
      toast.success(successMessage);
    }

    if(authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
  }

  render() {

    return (
      <>
        <Menu />
        {/* <Search/> */}
        {(this.props.taskLoading || this.props.authLoading) && <Spinner/>} 
        <Switch>
          <Route path="/" component={ToDo} exact />
          <Route path="/task/:id" component={SingleTask} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contacts" component={Contact} exact />
          <Route path="/registration" component={Registration} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/not-found" component={NotFound} exact />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      
      </>
    );

  }

  
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.taskReducer.error,
    successMessage: state.taskReducer.successMessage,
    taskLoading: state.taskReducer.loading,
    authLoading: state.authReducer.authLoading,
    // authErrorMessage: state.authReducer.authLoading
    authSuccessMessage: state.authReducer.authSuccessMessage
  }
}

export default connect(mapStateToProps, null)(App);