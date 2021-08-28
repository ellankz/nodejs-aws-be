'use strict';

const productsList = require('../mockData/productList.json');

module.exports = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(productsList),
  };
};
