import productsList from '../mockData/productList.json';

export default async () => {
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
