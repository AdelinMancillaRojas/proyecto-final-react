import React, { useState } from 'react';
import { IProuct } from '../webUtils/fetchProducts';
import _ from 'lodash';

const context = React.createContext<IProuct[] | any>(null);

const ProductsContextProvider = context.Provider;
export const ProductsContextConsumer = context.Consumer;

export interface IProductsContext {
  state: IProuct[];
  overrideData: (dataProducts: IProuct[]) => void;
}

const ProductsProvider = ({ children }: { children?: React.ReactNode }) => {
  const [products, setProducts] = useState<IProuct[]>([]);

  const overrideData = (dataProducts: IProuct[]) => {
    if (!_.isEqual(products, dataProducts)) setProducts(dataProducts);
  };

  return (
    <ProductsContextProvider
      value={{
        state: products,
        overrideData,
      }}
    >
      {children}
    </ProductsContextProvider>
  );
};
export default ProductsProvider;
