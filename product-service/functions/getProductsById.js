const productsList = require('../mockData/productList.json');

module.exports = async (event) => {
  const productId = event.pathParameters.productId;
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      productsList.find((product) => product.id === productId)
    ),
  };
};
