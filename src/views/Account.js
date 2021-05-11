import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserProfileForm from "../components/UserProfileForm";
import TransactionComponent from "./Transaction";

export const AccountComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      {/* <UserProfileForm email={user.email}></UserProfileForm> */}
      {/* <TransactionComponent accountNumber = '137813372'> </TransactionComponent> */}
      <Link
      to={{
        pathname: "/transaction",
        accountNumber: 137813372
      }}> View Transaction</Link>
    </Container>
  );
};

export default withAuthenticationRequired(AccountComponent, {
  onRedirecting: () => <Loading />,
});
