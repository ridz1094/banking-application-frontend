import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

let user = false;
let isEdit = false;
// let history =  useHistory();
class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { email: props.location.email, accountType: '', amount: 1000, isCreate: true}
        this.createAccount = this.createAccount.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    createAccount(){
        window.axios.post("/users/"+ this.state.email + "/accounts", { "accountType": this.state.accountType} ).then(function(response){
            console.log(response);
            window.location.href = '/account';
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    cancelCreate() {
        this.setState({ isCreate: false});
        // window.location.href = '/account?email='+this.state.email;
        window.history.back()
    }
    render() {
        return (
            <div className="container">
               
                <div className="container">
                <div className="columns">
                    <div className="column">
                    <label className="label">Account Type:</label>
                    <div className="control">                            
                            <input name="accountType" className="input" type="text" placeholder="Text input" value={this.state.accountType} onChange={this.handleInputChange}  />
                    </div>
                </div>
                <div className="column">
                    <label className="label">Amount: </label>
                    <div className="control">
                        <input name="amount" className="input" type="text" placeholder="Text input" value={this.state.amount} disabled/>
                    </div>
                </div> 
            </div>
            <div className="center">
                <button className="button is-primary" onClick={this.createAccount}>Create</button>
                <button className="button" onClick={this.cancelCreate}>Cancel</button>
            </div>
        </div>
            
                
         </div> 
        );
    }
}

export default CreateAccount;
