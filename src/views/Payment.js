import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PaymentForm from "../components/PaymentForm";
import FundTransferForm from "../components/FundTransferForm";

export const PaymentComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <PaymentForm  email={user.email}></PaymentForm>
    </Container>
  );
};

export default withAuthenticationRequired(PaymentComponent, {
  onRedirecting: () => <Loading />,
});