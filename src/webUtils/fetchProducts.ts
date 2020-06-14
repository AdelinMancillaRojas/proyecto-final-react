export interface IProuct {
  _id?: any;
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
}
export const addProduct = async (data: IProuct) => {
  return await await fetchApiProductos({
    method: 'POST',
    data,
  });
};
export const getProducts = async () => {
  return await fetchApiProductos({ method: 'GET' });
};
export const getProduct = async (id: string) => {
  return await fetchApiProductos({
    method: 'GET',
    id,
  });
};

const fetchApiProductos = async ({
  id = '',
  method,
  data,
}: {
  id?: string;
  method: string;
  data?: any;
}) => {
  const url = 'http://localhost:3001/productos/';

  try {
    const init = data
      ? {
          method,
          body: JSON.stringify({ data }), // data can be `string` or {object}!
          headers: {
            'Content-Type': 'application/json',
          },
        }
      : { method };

    const response = await fetch(url + id, init);
    const status = response.status;
    const parsedResponse = await response.json();
    return { status, parsedResponse };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
