import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let user = false;
let isEdit = false;
class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, email: props.email, isEdit: false, isCreate: props.isCreate}
        this.createUser = this.createUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
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

    createUser() {
        window.axios.post('/users', {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "identity_no": this.state.identity_no,
            "dob": this.state.dob,
            "address": this.state.address,
            "state": this.state.state,
            "zipCode": this.state.zipCode,
            "mobileNumber": this.state.mobileNumber,
            "role": "CUSTOMER"
        }).then(function (response) {
            // this.setState({isEdit: false});
            window.location.href = '/Profile';
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateUser() {
        window.axios.put('/users', {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "identity_no": this.state.identity_no,
            "dob": this.state.dob,
            "address": this.state.address,
            "state": this.state.state,
            "zipCode": this.state.zipCode,
            "mobileNumber": this.state.mobileNumber
        }).then(function (response) {
            console.log(response);
            this.setstate({ isEdit: false });
        }).catch(function (error) {
            console.log(error);
        });
    }
    changeEdit() {
        this.setState({ isEdit: !this.state.isEdit });
    }

    cancelCreate() {
        this.setState({ isCreate: false});
        window.location.href = '/';
    }
    render() {
        return (
            <div class="container">
                {this.state.isEdit ? 
                <div class="container">
                <div class="columns">
                    <div class="column">
                    <label class="label">First Name:</label>
                    <div class="control">                            
                            <input name="firstName" class="input" type="text" placeholder="Text input" value={this.state.firstName} onChange={this.handleInputChange}  />
                    </div>
                </div>
                <div class="column">
                    <label class="label">Last Name: </label>
                    <div class="control">
                        <input name="lastName" class="input" type="text" placeholder="Text input" value={this.state.lastName} onChange={this.handleInputChange} />
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">Email Id:</label>
                    <div class="control has-icons-left has-icons-right">
                        <input name="email" class="input" type="email" placeholder="Email input" value={this.state.email} disabled />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                </div>

                <div class="column">
                    <label class="label">Mobile No: </label>
                    <div class="control">
                        <input name="mobileNumber" class="input" type="tel" placeholder="Number input" value={this.state.mobileNumber} onChange={this.handleInputChange} />
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">Identity No: </label>
                    <div class="control">
                        <input name="identity_no" class="input" type="text" placeholder="Text input" value={this.state.identity_no} onChange={this.handleInputChange} />
                    </div>
                </div>

                <div class="column">
                    <label class="label">Date Of Birth: </label>
                    <div class="control">
                        <input name="dob" class="input" type="text" placeholder="Text input" value={this.state.dob} onChange={this.handleInputChange} />
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">Address: </label>
                    <textarea name="address" class="textarea" placeholder="2 lines of textarea" rows="2" value={this.state.address} onChange={this.handleInputChange}></textarea>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">State: </label>
                    <div class="control">
                        <input name="state" class="input" type="text" placeholder="Text input" value={this.state.state} onChange={this.handleInputChange} />
                    </div>
                </div>

                <div class="column">
                    <label class="label">Zip Code: </label>
                    <div class="control">
                        <input name="zip_code" class="input" type="text" placeholder="Text input" value={this.state.zipCode} onChange={this.handleInputChange} />
                    </div>
                </div>
            </div>
            <div class="center">
                <button class="button is-primary" onClick={this.updateUser}>Update</button>
                <button class="button" onClick={this.changeEdit}>Cancel</button>
            </div>
        </div>
            : this.state.isCreate ? 
            <div class="container">
            <div class="columns">
                <div class="column">
                <label class="label">First Name:</label>
                <div class="control">                            
                        <input name="firstName" class="input" type="text" placeholder="Text input" value={this.state.firstName} onChange={this.handleInputChange}  />
                </div>
            </div>
            <div class="column">
                <label class="label">Last Name: </label>
                <div class="control">
                    <input name="lastName" class="input" type="text" placeholder="Text input" value={this.state.lastName} onChange={this.handleInputChange} />
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <label class="label">Email Id:</label>
                <div class="control has-icons-left has-icons-right">
                    <input name="email" class="input" type="email" placeholder="Email input" value={this.state.email} disabled />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>

            <div class="column">
                <label class="label">Mobile No: </label>
                <div class="control">
                    <input name="mobileNumber" class="input" type="tel" placeholder="Number input" value={this.state.mobileNumber} onChange={this.handleInputChange} />
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <label class="label">Identity No: </label>
                <div class="control">
                    <input name="identity_no" class="input" type="text" placeholder="Text input" value={this.state.identity_no} onChange={this.handleInputChange} />
                </div>
            </div>

            <div class="column">
                <label class="label">Date Of Birth: </label>
                <div class="control">
                    <input name="dob" class="input" type="text" placeholder="Text input" value={this.state.dob} onChange={this.handleInputChange} />
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <label class="label">Address: </label>
                <textarea name="address" class="textarea" placeholder="2 lines of textarea" rows="2" value={this.state.address} onChange={this.handleInputChange}></textarea>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <label class="label">State: </label>
                <div class="control">
                    <input name="state" class="input" type="text" placeholder="Text input" value={this.state.state} onChange={this.handleInputChange} />
                </div>
            </div>

            <div class="column">
                <label class="label">Zip Code: </label>
                <div class="control">
                    <input name="zip_code" class="input" type="text" placeholder="Text input" value={this.state.zipCode} onChange={this.handleInputChange} />
                </div>
            </div>
        </div>
        <div class="center">
            <button class="button is-primary" onClick={this.createUser}>Save</button>
            <button class="button" onClick={this.cancelCreate}>Cancel</button>
        </div>
    </div>
            :
            <div class="container">
            <div class="columns">
                    <div class="column">
                        <label class="label">First Name:</label>
                        <div class="control">                            
                                {this.state.firstName}
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Last Name: </label>
                        <div class="control">
                            {this.state.lastName}
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">Email Id:</label>
                        <div class="control">
                            {this.state.email}
                        </div>
                    </div>

                    <div class="column">
                        <label class="label">Mobile No: </label>
                        <div class="control">
                            {this.state.mobileNumber}
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">Identity No: </label>
                        <div class="control">
                            {this.state.identity_no}
                        </div>
                    </div>

                    <div class="column">
                        <label class="label">Date Of Birth: </label>
                        <div class="control">
                            {this.state.dob}
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">Address: </label>
                        {this.state.address}
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">State: </label>
                        <div class="control">
                            {this.state.state}
                        </div>
                    </div>

                    <div class="column">
                        <label class="label">Zip Code: </label>
                        <div class="control">
                            {this.state.zipCode}
                        </div>
                    </div>
                </div>
                <div class="center">
                    <div class="control">
                        <button class="button is-primary" onClick={this.changeEdit}>Edit</button>
                    </div>
                </div>
                </div>
                }
                
         </div> 
            // : null }


            // ------------------

            // <div class="container">
            // <div class="columns">
            // <div class="column">
            //     <label class="label">First Name: </label>
            //     <div>{this.state.user.firstName}</div>
            // </div>
            // <div class="column">
            //     <label class="label">Last Name: </label>
            //     <div>{this.state.user.lastName}</div>
            // </div>
            // </div>
            // <div class="columns">
            // <div class="column">
            //     <label class="label">Email Id: </label>
            //     <div>{this.state.user.email}</div>
            // </div>

            // <div class="column">
            //     <label class="label">Mobile No: </label>
            //     <div>{this.state.user.mobileNumber}</div>
            // </div>
            // </div>
            // <div class="columns">
            // <div class="column">
            //     <label class="label">Identity No: 
            //     <div>{this.state.user.identity_no}</div></label>
            // </div>

            // <div class="column">
            //     <label class="label">Date Of Birth: </label>
            //     <div>{this.state.user.dob}</div>
            // </div>
            // </div>
            // <div class="columns">
            // <div class="column">
            //     <label class="label">Address: </label>
            //     <div>{this.state.user.address}</div>
            // </div>
            // </div>
            // <div class="columns">
            // <div class="column">
            //     <label class="label">State: </label>
            //     <div>{this.state.user.state}</div>
            // </div>

            // <div class="column">
            //     <label class="label">Zip Code:</label>
            //     <div>{this.state.user.zipCode}</div>
            // </div>
            // </div>
            // <div class="center">
            // <div class="control">
            //     <button class="button is-primary" onClick={this.editUser}>Edit</button>
            // </div>
            // </div>
            // </div>
        );
    }
}

export default UserProfileForm;
