import React from 'react';
import { IProuct } from '../../webUtils/fetchProducts';
import { useHistory } from 'react-router-dom';
import IconBoton from '../common/IconoBoton/';
import { Row, Col } from 'reactstrap';

export const ItemProducto = ({ product }: { product: IProuct }) => {
  const history = useHistory();

  return (
    <Row className='py3'>
      <Col sm='3'>{product.nombre}</Col>
      <Col sm='3'>{product.marca}</Col>
      <Col sm='3'>${product.precio}</Col>
      <Col sm='3' className='text-center'>
        <IconBoton
          tipo='info'
          callBack={() => history.push('/info/' + product._id)}
        />
      </Col>
    </Row>
  );
};
