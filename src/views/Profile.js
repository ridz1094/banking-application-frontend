import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import UserProfileForm from "../components/UserProfileForm";

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <UserProfileForm email={user.email}></UserProfileForm>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
