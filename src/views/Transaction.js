import React, { Fragment, Component } from "react";

import TransactionView from "../components/TransactionView";
import Content from "../components/Content";
import TransactionComponent from "../components/TransactionView";

// const TransactionComponent = () => (
//   <Fragment>
//     <TransactionView />
//     <hr />
//   </Fragment>
// );

// export default Transaction;

class Transaction extends Component {
  constructor(props) {
      super(props);
      this.state = {accountNumber: props.location.accountNumber}
  }
  render(){
  return ( 
    <div className="mb-5">
      <TransactionComponent accountNumber={this.state.accountNumber}></TransactionComponent>
    </div>
  );
  }
};

export default Transaction;
