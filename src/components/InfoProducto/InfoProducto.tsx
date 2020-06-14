import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
} from 'reactstrap';
import { IProuct, getProduct } from '../../webUtils/fetchProducts';
import IconBoton from '../common/IconoBoton';
import CustomAlert from '../CustomAlert';

export const InfoProducto = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [productData, SetproductData] = useState<IProuct>();

  useEffect(() => {
    setIsLoading(true);
    const fetchProduct = async () => {
      const res = await getProduct(id);
      if (res.error) setError(res.error);
      else SetproductData(res.parsedResponse as IProuct);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);

  return isLoading ? (
    <div className='px-auto'>
      <Spinner size='md' color='secondary' />
    </div>
  ) : productData ? (
    <CardProduct product={productData} />
  ) : (
    <CustomAlert color='danger'>Algo salió mal {error}</CustomAlert>
  );
};

interface ITextFieldProps {
  columns?: number;
  label: string;
  children: React.ReactNode;
}
const TextField = ({ columns = 12, label, children }: ITextFieldProps) => {
  return (
    <Col sm={columns}>
      <Row>
        <h5>{label}</h5>
      </Row>
      <Row>
        <CardText>{children}</CardText>
      </Row>
    </Col>
  );
};

const CardProduct = ({ product }: { product: IProuct }) => {
  const history = useHistory();
  return (
    <div className='container'>
      <Card className='pt-4'>
        <CardHeader>
          <Row>
            <Col sm='10'>{product.nombre}</Col>
            <Col sm='1'>
              <IconBoton
                tipo='info'
                callBack={() => {
                  history.push('/');
                }}
              >
                Volver
              </IconBoton>
            </Col>
            <Col sm='1' />
          </Row>
        </CardHeader>
        <CardBody className='text-center'>
          <Row>
            <Col sm='2' />
            <TextField columns={4} label='Marca'>
              {product.marca}
            </TextField>
            <Col sm='2' />
            <TextField columns={4} label='Precio'>
              ${product.precio}
            </TextField>
          </Row>
        </CardBody>
        <CardFooter className='text-muted text-'>
          Stock: {product.stock} unidades
        </CardFooter>
      </Card>
    </div>
  );
};
