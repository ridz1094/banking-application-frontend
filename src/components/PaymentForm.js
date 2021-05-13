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
        window.axios.get('/users/' + currentComponent.state.email).then(function (response) {
            // handle success
            currentComponent.setState(response.data);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createTransaction() {
        window.axios.post('/billpayment/'+this.state.email, {
            "biller_type": this.state.billertype,
            "amount": this.state.amount,
            "transaction_date" : "2007-12-03T10:15:30+01:00",
            "to_account" : this.state.toaccount,
            "from_account" : this.state.fromaccount,
            "frequency" : this.state.frequency
        }).then(function (response) {
            // this.setState({isEdit: false});
            window.location.href = '/';
        })
            .catch(function (error) {
                console.log(error);
            });
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
                            <label class="label">Biller Type</label>
                            <div class="control">
                                <select name="billertype" id="Biller Type" onChange={this.handleInputChange}>
                                    <option value="Water">Water</option>
                                    <option value="Electricity">Electricity</option>
                                    <option value="Internet">Internet</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <label class="label">Frequency</label>
                            <div class="control">
                                <select name="frequency" id="frequency" onChange={this.handleInputChange}>
                                <option value="Select Frequency">Default</option>
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
