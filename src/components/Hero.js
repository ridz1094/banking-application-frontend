import React, { Component } from "react";

import logo from "../assets/logo.svg";
import UserProfileForm from "./UserProfileForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
const axios = require('axios');

class Hero extends Component {
  constructor(props) {
    super(props);
    const { user, isAuthenticated } = this.props.auth0;
    this.state = {showCreate: false, email: user && user.email ? user.email : false , userFound : false, isAuthenticated: isAuthenticated}
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    
    
}

componentDidMount() {
  let currentComponent = this;
  this.getUser(currentComponent);
}

getUser(currentComponent) {
  window.axios.get('/users/' + currentComponent.state.email).then(function (response) {
      if(response && response.data && response.data.email == currentComponent.state.email){
        currentComponent.setState({userFound: true});

      }else{
        currentComponent.setState({userFound: false});
      }
  })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
}

createUser(){
    console.log("Helelo from create");
    this.setState({showCreate: true})
  }

  render() {
    
    return (
      <div className="text-center hero my-5">
       <h1 className="mb-4">Welcome to Banking Application</h1>
       {this.state.showCreate ? <UserProfileForm isCreate={true}/> : 
     <div class="center">
       
      <div class="control">

        
        {this.state.isAuthenticated && !this.state.userFound ?
      <button class="button is-primary" ><Link
      to={{
        pathname: "/createUser",
        state: { email: this.state.email }
      }}> Create User</Link></button>
        : ''}
    </div>
  </div>
  }
  </div>
    );
  }
}

export default withAuth0(Hero);




