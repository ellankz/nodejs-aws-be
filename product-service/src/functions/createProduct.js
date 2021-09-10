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

    const response = await client.query(
      `WITH products as (
        insert into products (title, description, image_url, price) values
        ('${title}', '${description}', '${image_url}', '${price}')
            returning id, title
        )
        insert into stocks (product_id, count) values 
        ((select products.id from products where products.title = '${title}'), '${count}') returning product_id`
    );

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        product_id: response?.rows[0]?.id,
      }),
    };
  } catch (error) {
    return handleError(500);
  } finally {
    client.end();
  }
};
