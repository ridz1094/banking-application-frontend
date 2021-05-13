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
class AccountView extends Component {

    constructor(props) {
        super(props);
        this.state = { email: props.email, accountRows: false }
        this.getAccounts = this.getAccounts.bind(this);
        this.closeAccount = this.closeAccount.bind(this);
    }

    componentDidMount() {
        let currentComponent = this;
        this.getAccounts(currentComponent);
    }

    closeAccount(accountNumber){
        let currentComponent = this;
        window.axios.delete('/users/' + currentComponent.state.email + '/accounts/' + accountNumber) .then(function (response) {
            currentComponent.getAccounts(currentComponent);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    getAccounts(currentComponent) {
        window.axios.get('/users/' + currentComponent.state.email + '/accounts').then(function (response) {
            var acc = [];
            if (response && response.data) {
                response.data.forEach(account => {
                    acc.push(<tr>
                        <td>{account.account_number}</td>
                        <td>{account.account_type}</td>
                        <td>{account.balance}</td>
                        <td>{account.date_opened}</td>
                        <td>{account.status}</td>
                        <td><Link to={{
                                    pathname: "/transaction",
                                    accountNumber: account.account_number
                                }}> View Transaction</Link></td>
                        <td><div class="control">
                        <button class="button is-primary" onClick={()=>{currentComponent.closeAccount(account.account_number)}}>Close Account</button>
                    </div></td>
                    </tr>)
                })
                currentComponent.setState({ accountRows: acc })
            } else {
                currentComponent.setState({ accountRows: null });
            }
        }).catch(function (error) {
            // handle error
            console.log(error);
            currentComponent.setState({ accountRows: null });
        })
    }

    render() {
        return (
            <div>
                { this.state.accountRows ? 
                <table class="table">
                    <thead>
                        <tr>
                            <th><abbr title="number">Account Number</abbr></th>
                            <th><abbr title="type"></abbr>Account Type</th>
                            <th><abbr title="balance">Balance</abbr></th>
                            <th><abbr title="date">Opening Date</abbr></th>
                            <th><abbr title="status">Status</abbr></th>
                            <th><abbr title="transation">Transactions</abbr></th>
                            <th><abbr title="close">Close Account</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.accountRows}
                    </tbody>
                </table>
                :
                <div>
                    No Accounts Found for this user
                </div>
            }
            <br></br>
            <button class="button is-primary" ><Link
          to={{
            pathname: "/createAccount",
            email: this.state.email
          }}> Create Account</Link> </button>
            </div>
        )
    };
}

export default withAuth0(AccountView);