import productsList from '../mockData/productList.json';

export default async (event) => {
  const productId = event.pathParameters.productId;
  const productsJSON = await JSON.stringify(
    productsList.find((product) => product.id === productId)
  );
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: productsJSON,
  };
};
