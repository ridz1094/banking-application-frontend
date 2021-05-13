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
let rowTransactionsRecords = [], searchTransaction = [];
let transactionRecords = null;
class TransactionView extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        const { user, isAuthenticated } = this.props.auth0;
        this.state = { searchPhrase: '' 
        , accountNumber: props.accountNumber
    }
        this.getTransactions = this.getTransactions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.state.accountNumber = this.props.accountNumber;
        this.state.rowsTransactions = [];
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        rowTransactionsRecords = []
        searchTransaction = []
        let currentComponent = this;
        this.getTransactions(currentComponent);
    }
    search() {
        searchTransaction = [];
        
        transactionRecords.forEach(tr => { if (tr.transaction_id == this.state.searchPhrase) searchTransaction.push(<tr>
            <td>{tr.transaction_id}</td>
            <td>{tr.transaction_type}</td>
            <td>{tr.transaction_frequency}</td>
            <td>{tr.amount}</td>
            <td>{tr.to_account}</td>
            <td>{tr.transaction_status}</td>
            <td>{tr.transaction_date}</td>
        </tr>) })
        if(!this.state.searchPhrase){
            this.setState({ rowsTransactions: rowTransactionsRecords }) 
        }else{
            this.setState({ rowsTransactions: searchTransaction })
        }
        

    }
    handleInputChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    getTransactions(currentComponent) {
        window.axios.get('/transactions/account/' + currentComponent.state.accountNumber).then(function (response) {
            if (response && response.data && response.data.transactions) {
                currentComponent.setState({ transactions: response.data.transactions });
                transactionRecords = response.data.transactions;
                response.data.transactions.forEach(tr => {
                    rowTransactionsRecords.push(<tr>
                        <td>{tr.transaction_id}</td>
                        <td>{tr.transaction_type}</td>
                        <td>{tr.transaction_frequency}</td>
                        <td>{tr.amount}</td>
                        <td>{tr.to_account}</td>
                        <td>{tr.transaction_status}</td>
                        <td>{tr.transaction_date}</td>
                    </tr>)
                })
                searchTransaction = rowTransactionsRecords;
                currentComponent.setState({ rowsTransactions: searchTransaction })
            } else {
                currentComponent.setState({ transactions: null });
            }
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                 { this.state.rowsTransactions && this.state.rowsTransactions.length > 0 ? 
                 <div>
                <div class="field">
                    <div class="control has-icons-left">
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>
                        <input class="input" type="text" name="searchPhrase" placeholder="Search" value={this.state.searchPhrase} onKeyUp={this.search} onChange={this.handleInputChange} />
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th><abbr title="index">Transaction Id</abbr></th>
                            <th><abbr title="type"></abbr>Type</th>
                            <th><abbr title="frequency">Frequency</abbr></th>
                            <th><abbr title="amount">Amount</abbr></th>
                            <th><abbr title="fm_acc">To Account</abbr></th>
                            <th><abbr title="status">Status</abbr></th>
                            <th><abbr title="date">Date</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rowsTransactions}
                    </tbody>
                </table>
                </div>
                :
                <div>
                    No Transaction Records Found
                    </div>
                    }
            </div>
        )
    };
}

export default withAuth0(TransactionView);