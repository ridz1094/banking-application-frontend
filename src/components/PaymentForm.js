import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const axios = require('axios');


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, email: props.email}
        this.createTransaction = this.createTransaction.bind(this);
        this.getUser = this.getUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
    }
    componentDidMount() {
        let currentComponent = this;
        this.getUser(currentComponent);
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }


    getUser(currentComponent) {
        axios.get('http://localhost:8080/users/' + currentComponent.state.email).then(function (response) {
            // handle success
            currentComponent.setState(response.data);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createTransaction() {
        if (this.state.frequency == "Once") {
            axios.post('http://localhost:8080/transactions/' + this.state.email, {
                "transaction_type": "Debit",
                "amount": this.state.amount,
                "transaction_date": "2007-12-03T10:15:30+01:00",
                "to_account": this.state.toaccount,
                "from_account": this.state.fromaccount,
                "transaction_status": "Completed"
            }).then(function (response) {
                // this.setState({isEdit: false});
                //window.location.href = '/Profile';
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            axios.post('http://localhost:8080/recurringpayments/' + this.state.email, {
                "transaction_type": "Debit",
                "amount": this.state.amount,
                "transaction_date": "2007-12-03T10:15:30+01:00",
                "to_account": this.state.toaccount,
                "from_account": this.state.fromaccount,
                "transaction_frequency": this.state.frequency
            }).then(function (response) {
                // this.setState({isEdit: false});
                //window.location.href = '/Profile';
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }



    changeEdit() {
        this.setState({ isEdit: !this.state.isEdit });
    }

    cancelCreate() {
        this.setState({ isCreate: false });
        window.location.href = '/';
    }
    render() {
        return (
            <div class="container">
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <label class="label">From Account:</label>
                            <div class="control">
                                <input name="fromaccount" class="input" type="text" placeholder="Debit account number" value={this.state.fromaccount} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label class="label">To Account: </label>
                            <div class="control">
                                <input name="toaccount" class="input" type="text" placeholder="Credit account number" value={this.state.toaccount} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label class="label">Amount</label>
                            <div class="control">
                                <input name="amount" class="input" type="text" placeholder="Amount in dollars" value={this.state.amount} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label class="label">Biller ID</label>
                            <div class="control">
                                <input name="amount" class="input" type="text" placeholder="Biller ID" value={this.state.billerid} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label class="label">Frequency</label>
                            <div class="control">
                                <select name="frequency" id="frequency" onChange={this.handleInputChange}>
                                    <option value="Once">Once</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="center">
                        <button class="button is-primary" onClick={this.createTransaction}>Make payment</button>
                        <button class="button" onClick={this.cancelCreate}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;
