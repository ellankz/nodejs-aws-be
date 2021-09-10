import { Client } from 'pg';
import { dbOptions } from '../../config';
import { handleError } from './handleError';

export default async (event) => {
  const client = new Client(dbOptions);
  await client.connect();

  if (!event.body) {
    return handleError(400);
  }

  try {
    const body = JSON.parse(event.body);

    const { title, description, image_url, price, count } = body;

    if (!title || !description || !image_url || !price) {
      return handleError(400);
    }

    const productResponse = await client.query(
      `insert into products (title, description, image_url, price) values ('${title}', '${description}', '${image_url}', '${price}') RETURNING *`
    );

    const product = productResponse?.rows?.[0];

    if (!product) {
      return handleError(500);
    }
    const stockResponse = await client.query(
      `insert into stocks (product_id, count) values ('${product.id}', '${count}') RETURNING *`
    );

    if (!stockResponse?.rows?.[0]) {
      return handleError(500);
    }

    const productJSON = await JSON.stringify({ ...product, count });

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: productJSON,
    };
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};
