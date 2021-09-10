const { createProduct } = require('../handler');

test('product is created', async () => {
  const event = {
    body: JSON.stringify({
      title: 'Awesome outfit',
      description: 'Made just for you',
      image_url: 11,
      price: 999,
      count: 5,
    }),
  };

  const result = await createProduct(event);
  expect(result).toBeDefined();
  expect(result.statusCode).toBe(201);
});

test('bad request error is received', async () => {
  const event = {
    body: JSON.stringify({
      title: 'Awesome outfit',
      image_url: 11,
      price: 999,
    }),
  };

  const result = await createProduct(event);
  const product = JSON.parse(result.body);

  expect(result).toBeDefined();
  expect(product).toHaveProperty('code');
  expect(product).toHaveProperty('status');
});

test('bad request error for empty body is received', async () => {
  const event = {
    body: undefined,
  };

  const result = await createProduct(event);
  const product = JSON.parse(result.body);

  expect(result).toBeDefined();
  expect(product).toHaveProperty('code');
  expect(product).toHaveProperty('status');
});
