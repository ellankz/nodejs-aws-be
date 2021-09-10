import { Client } from 'pg';
import { dbOptions } from '../../config';
import { handleError } from './handleError';

export default async (event) => {
  const client = new Client(dbOptions);
  await client.connect();
  const productId = event.pathParameters.productId;

  try {
    const productResponse = await client.query(
      `select products.id, products.title, products.description, products.image_url, products.price, stocks.count from products left join stocks on stocks.product_id = products.id where products.id = '${productId}'`
    );

    const product = productResponse?.rows?.[0];

    if (!product) {
      return handleError(404);
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
  } catch (error) {
    return handleError(500);
  } finally {
    client.end();
  }
};
