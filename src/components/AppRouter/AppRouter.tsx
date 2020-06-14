import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import CustomNavBar from '../CustomNavBar';
import ListaProductos from '../ListaProductos/';

import ProductsProvider, {
  ProductsContextConsumer,
  IProductsContext,
} from '../../provider/productsProvider';
import InfoProducto from '../InfoProducto';
export const AppRouter = () => {
  return (
    <HashRouter>
      <ProductsProvider>
        <CustomNavBar />
        <Switch>
          <Route exact path='/'>
            <ProductsContextConsumer>
              {(state: IProductsContext) => (
                <ListaProductos
                  overrideData={state.overrideData}
                  state={state.state}
                />
              )}
            </ProductsContextConsumer>
          </Route>
          <Route exact path='/info/:id'>
            <InfoProducto />
          </Route>
        </Switch>
      </ProductsProvider>
    </HashRouter>
  );
};
