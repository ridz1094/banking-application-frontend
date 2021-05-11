import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import FundTransfer from "./views/FundTransfer";
import CreateUser from "./views/CreateUser";
import Account from "./views/Account";
import Transaction from "./views/Transaction";
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
  // baseURL: "http://localhost:8080",
  baseURL: "https://bankingapi-env.eba-h3kss9ar.us-east-1.elasticbeanstalk.com",
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
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
