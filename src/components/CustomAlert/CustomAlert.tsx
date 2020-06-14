import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Row, Col, Spinner } from 'reactstrap';

interface IAlertColor {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
}

export const CustomAlert = ({
  color,
  timeout,
  children,
  to,
}: {
  color: keyof IAlertColor;
  timeout?: number | string;
  to?: string;
  children: React.ReactNode;
}) => {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    if (to) history.push(to);
    setVisible(false);
  };
  if (Number(timeout)) {
    setTimeout(() => {
      onDismiss();
    }, Math.trunc(Number(timeout)));
  }
  const alerta = () => (
    <Alert color={color} isOpen={visible} toggle={onDismiss}>
      {children}
    </Alert>
  );
  return (
    <div className='container'>
      {timeout ? (
        <Row>
          <Col sm='11'>{alerta()}</Col>
          <Col sm='1'>
            <Spinner color={color} type='grow' />
          </Col>
        </Row>
      ) : (
        alerta()
      )}
    </div>
  );
};
