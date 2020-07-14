import React, {useEffect, useState} from 'react';
import {
  Card, CardBody, Col, ButtonToolbar,
} from 'reactstrap';
import EmailIcon from 'mdi-react/EmailIcon';
import CheckboxMarkedCircleIcon from 'mdi-react/CheckboxMarkedCircleIcon';
import { Link } from 'react-router-dom';
import {loginEmailConfirm} from "../../../../lib/api/login";

const EmailConfirmationCard = (props) => {
  const {id, target, secret} = props;
  const [comments, setComments] = useState("인증되었습니다.");

  const sendEmailAuth = async () => {
    console.log('sendEmailAuth:', id);
    console.log('sendEmailAuth:', secret);
    try {
      const response = await loginEmailConfirm({id, target, secret});
    } catch (err) {
      console.log('axios error:', err);
      setComments("인증이 실패하였습니다!");
    }
  };

  useEffect(() => {
      sendEmailAuth();
  }, []);

  return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="email-confirmation">
              <div className="email-confirmation__icon">
                <EmailIcon className="email-confirmation__mail" />
                <CheckboxMarkedCircleIcon className="email-confirmation__check" />
              </div>
              <h3 className="email-confirmation__title">{comments}</h3>
              <p className="email-confirmation__sub">감사합니다.</p>
            </div>
          </CardBody>
        </Card>
      </Col>
  );
};


export default EmailConfirmationCard;
