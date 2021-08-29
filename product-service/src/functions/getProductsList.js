import productsList from '../mockData/productList.json';

export default async () => {
  if (!productsList && !productsList.length) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        code: 404,
        status: 'Not found',
      }),
    };
  }
  const productsJSON = await JSON.stringify(productsList);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: productsJSON,
  };
};
