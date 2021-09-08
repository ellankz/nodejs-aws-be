import { handleError } from './handleError';
import { Client } from 'pg';
import { dbOptions } from '../../config';

export default async () => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const products = await client.query(
      `select products.id, products.title, products.description, products.image_url, products.price, stocks.count from products left join stocks on stocks.product_id = products.id`
    );

    if (!products?.rows && !products?.rows?.length) {
      return handleError(404);
    }
    const productsJSON = await JSON.stringify(products?.rows);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: productsJSON,
    };
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};
