import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import RefundForm from "../components/RefundForm";

export const FundTransferComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <RefundForm  email={user.email}></RefundForm>
    </Container>
  );
};

export default withAuthenticationRequired(FundTransferComponent, {
  onRedirecting: () => <Loading />,
});
