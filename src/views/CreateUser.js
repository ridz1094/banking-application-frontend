import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import UserProfileForm from "../components/UserProfileForm";
import properties from "highlight.js/lib/languages/properties";

class CreateUserComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {email: props.location.state.email}
  }
  render(){
  return ( 
    <Container className="mb-5">
      <UserProfileForm isCreate={true} email={this.state.email}></UserProfileForm>
    </Container>
  );
  }
};

export default CreateUserComponent;
// withAuthenticationRequired(CreateUserComponent, {
//   onRedirecting: () => <Loading />,
// });
