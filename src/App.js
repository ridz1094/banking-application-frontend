import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import FundTransfer from "./views/FundTransfer";
import Payment from "./views/Payment";
import CreateUser from "./views/CreateUser";
import Account from "./views/Account";
import Transaction from "./views/Transaction";
import CreateAccount from "./components/CreateAccount";
import Refund from "./views/Refund";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
// import axios from require('axios');

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import { AccountComponent } from "./views/Account";
initFontAwesome();
const axios = require('axios');

window.axios = axios.create({
  // Local host URL.
  // baseURL: "http://localhost:8080",

  // Individual EC2 Server URLs.
  // baseURL: "http://3.87.235.117:8080/bankingapi",
  // baseURL: "http://54.226.31.254:8080/bankingapi",
  
  // AWS Load balances URL.
  baseURL: "https://apiservice-653459351.us-east-1.elb.amazonaws.com/bankingapi",
  crossDomain: true
});

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }



  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/createUser" component={CreateUser} />
            <Route path="/account" component={Account} />
            <Route path="/transaction" component={Transaction} />
            <Route path="/transfer" component={FundTransfer}/>
            <Route path="/payment" component={Payment}/>
            <Route path="/createAccount" component={CreateAccount}/>
            <Route path="/refund" component={Refund}/>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
