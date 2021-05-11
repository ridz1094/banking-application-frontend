import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import FundTransferForm from "../components/FundTransferForm";

export const FundTransferComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <FundTransferForm  email={user.email}></FundTransferForm>
    </Container>
  );
};

export default withAuthenticationRequired(FundTransferComponent, {
  onRedirecting: () => <Loading />,
});