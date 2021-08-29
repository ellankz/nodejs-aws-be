import productsList from '../mockData/productList.json';

export default async (event) => {
  const productId = event.pathParameters.productId;
  const product = productsList.find((product) => product.id === productId);

  if (!product) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: {
        code: 404,
        status: 'Not found',
      },
    };
  }

  const productJSON = await JSON.stringify(product);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: productJSON,
  };
};
