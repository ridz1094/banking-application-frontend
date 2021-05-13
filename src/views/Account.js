import React, { Component } from "react";
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
import AccountView from "../components/AccountView";


// class Account extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <Container className="mb-5">
//         <AccountView email={user.email}></AccountView>
//         {/* <TransactionComponent accountNumber = '137813372'> </TransactionComponent> */}
//         <Link
//           to={{
//             pathname: "/transaction",
//             accountNumber: 137813372
//           }}> View Transaction</Link>

//         <Link
//           to={{
//             pathname: "/createAccount",
//             accountNumber: 137813372
//           }}> Create Account</Link>
//       </Container>
//     );
//   };
// }
// export default Account;

export const Account = () => {
  const { user } = useAuth0();
  const urlParams = new URLSearchParams(window.location.search);
  const emailUser = urlParams.get('email');
  
  return (
    <Container className="mb-5">
      <AccountView email={user ? user.email : emailUser}></AccountView>
    </Container>
  );
};

export default 
// Account;
withAuthenticationRequired(Account, {
  onRedirecting: () => <Loading />,
});
