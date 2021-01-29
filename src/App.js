import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Menu from './components/Menu/Menu'
import ToDo from './pages/Todo/ToDo';
import About from './pages/about/About';
import Contact from './pages/contacts/Contact';
import NotFound from './pages/not-found/Not-found';
import SingleTask from './pages/singleTask/SingleTask';
import Spinner from './components/Spinner/Spinner'
import CustomRoute from './components/Router/CustomRoute';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from './components/footer/Footer';




class App extends React.PureComponent {

  componentDidUpdate() {
    const {errorMessage, successMessage, authSuccessMessage, authErrorMessage} = this.props;
    if(errorMessage) {
      toast.error(errorMessage);
    }

    if(successMessage) {
      toast.success(successMessage);
    }

    if(authSuccessMessage) {
      toast.success(authSuccessMessage);
    }

    if(authErrorMessage) {
      toast.error(authErrorMessage);
    }
  }

  render() {

    return (
      <div>
        <Menu />
        {(this.props.taskLoading || this.props.authLoading) && <Spinner/>} 
        <Switch>
          <CustomRoute type='private' path="/" component={ToDo} exact />
          <CustomRoute type='private' path="/task/:id" component={SingleTask} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contacts" component={Contact} exact />
          <CustomRoute path="/registration" component={Registration} exact />
          <CustomRoute path="/login" component={Login} exact />
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
      <Footer/>
      </div>
    );

  }

  
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.taskReducer.error,
    successMessage: state.taskReducer.successMessage,
    taskLoading: state.taskReducer.loading,
    authLoading: state.authReducer.authLoading,
    authErrorMessage: state.authReducer.authError,
    authSuccessMessage: state.authReducer.authSuccessMessage
  }
}

export default connect(mapStateToProps, null)(App);