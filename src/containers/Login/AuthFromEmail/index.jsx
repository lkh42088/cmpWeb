import React from "react";
import {Container, Row} from "reactstrap";
import EmailConfirmationCard from "./components/EmailConfirmationCard";

const LoginEmailAuth = ({match}) => {
    const { id, target, secret } = match.params;
    return (
        <Container>
            <Row>
                <EmailConfirmationCard id={id} target={target} secret={secret} />
            </Row>
        </Container>
    );
};

export default LoginEmailAuth;
