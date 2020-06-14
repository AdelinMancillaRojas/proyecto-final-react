import React, { useState, useEffect } from 'react';
import { IProuct, getProducts } from '../../webUtils/fetchProducts';
import { Spinner, Col, Row, Modal, ModalBody } from 'reactstrap';
import ItemProducto from '../ItemProducto';
import CustomAlert from '../CustomAlert/index';
import IconBoton from '../common/IconoBoton';
import FormProducto from '../FormProduct/index';

export const ListaProductos = (state: {
  state: IProuct[];
  overrideData: (products: IProuct[]) => void;
}) => {
  //   const [products, setProducts] = useState<IProuct[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const updateStore = (newProduct: IProuct) => {
    setModalOpen(false);
    state.overrideData([...state.state, newProduct]);
  };

  useEffect(() => {
    const makeFetch = async () => {
      setIsLoading(true);
      const products = await getProducts();
      if (products.parsedResponse && products.status === 200) {
        state.overrideData(products.parsedResponse as IProuct[]);
      } else if (products.error) {
        setError(true);
      }
      setIsLoading(false);
    };
    makeFetch();
  }, [state]);

  return isLoading ? (
    <div className='px-auto'>
      <Spinner size='md' color='secondary' />
    </div>
  ) : error ? (
    <CustomAlert color='danger'>Algo salió mal {error}</CustomAlert>
  ) : (
    <div className='container pt-4'>
      <Row className='pb-4'>
        <Col className='text-center' sm='3'>
          Nombres
        </Col>
        <Col className='text-center' sm='3'>
          Marca
        </Col>
        <Col className='text-center' sm='3'>
          Precio
        </Col>
        <Col className='text-center' sm='3'>
          <IconBoton tipo='add' callBack={() => setModalOpen(true)} />
        </Col>
      </Row>
      {state.state.map((product, i) => {
        return (
          <div className='py-1' key={i}>
            <ItemProducto product={product} />
          </div>
        );
      })}
      <Modal isOpen={modalOpen}>
        <ModalBody>
          <FormProducto
            cancelCallBack={() => setModalOpen(!modalOpen)}
            titulo='Añadir Produto'
            doneCallback={updateStore}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
