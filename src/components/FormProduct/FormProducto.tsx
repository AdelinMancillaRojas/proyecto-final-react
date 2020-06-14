import React, { useRef } from 'react';

import CustomFromInput from '../common/FormInput';
import { IProuct } from '../../webUtils/fetchProducts';
import { Form, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import IconBoton from '../common/IconoBoton';

import { addProduct } from '../../webUtils/fetchProducts';

interface IFunForm {
  add: string;
  edit: string;
}

export const FormProducto = ({
  titulo,
  cancelCallBack,
  doneCallback,
}: {
  titulo: string;

  cancelCallBack?: () => void;
  doneCallback?: (newProduct: IProuct) => void;
}) => {
  const nombre = useRef(null);
  const marca = useRef(null);
  const precio = useRef(null);
  const stock = useRef(null);

  const validaciones = {
    nombre: /^[A-Za-z0-9\s]{10,40}$/,
    marca: /^[A-Za-z0-9\s]{5,40}$/,
    numeros: /^[0-9]{1,30}$/,
  };

  const history = useHistory();

  const sendProduct = async () => {
    //@ts-ignore
    const nombreValue = nombre.current.props.value;
    //@ts-ignore
    const marcaValue = marca.current.props.value;
    //@ts-ignore
    const precioValue = precio.current.props.value;
    //@ts-ignore
    const stockValue = stock.current.props.value;

    if (
      validaciones.nombre.test(nombreValue) &&
      validaciones.marca.test(marcaValue) &&
      validaciones.numeros.test(precioValue) &&
      validaciones.numeros.test(stockValue)
    ) {
      const producto: IProuct = {
        nombre: nombreValue,
        marca: marcaValue,
        precio: precioValue,
        stock: stockValue,
      };
      const res = await addProduct(producto);
      if (res.parsedResponse) {
        alert('Producto Agregado');
        if (doneCallback) doneCallback(res.parsedResponse);
        history.push('/');
      } else alert('Error Agregando ' + res.error);
    }
  };
  const cancel = () => {
    if (cancelCallBack) cancelCallBack();
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className='container'>
      <Form onSubmit={onSubmit}>
        <h4>{titulo}</h4>
        <Row form>
          <Col sm='6'>
            <CustomFromInput
              label='Nombre Producto'
              errMessage='Solo letras, numero y espacios entre 10 y 40 caracteres'
              placeholder='Nombre'
              refer={nombre}
              validator={validaciones.nombre}
            />
          </Col>
          <Col sm='6'>
            <CustomFromInput
              label='Marca del producto'
              errMessage='Solo letras, numero y espacios entre 5 y 40 caracteres'
              placeholder='Marca'
              refer={marca}
              validator={validaciones.marca}
            />
          </Col>
        </Row>
        <Row form>
          <Col sm='6'>
            <CustomFromInput
              label='Precio'
              errMessage='Solo numeros positivos'
              placeholder='Precio'
              refer={precio}
              validator={validaciones.numeros}
            />
          </Col>
          <Col sm='6'>
            <CustomFromInput
              label='Cantidad en stock'
              errMessage='Solo numeros positivos'
              placeholder='Stock'
              refer={stock}
              validator={validaciones.numeros}
            />
          </Col>
        </Row>
        <Row form>
          <Col sm='2' />
          <Col sm='2'>
            <IconBoton callBack={sendProduct} tipo='info'>
              Enviar
            </IconBoton>
          </Col>
          <Col sm='3' />
          <Col sm='2'>
            <IconBoton tipo='danger' callBack={cancel}>
              Cancelar
            </IconBoton>
          </Col>
          <Col sm='3' />
        </Row>
      </Form>
    </div>
  );
};
