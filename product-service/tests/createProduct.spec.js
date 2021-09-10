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
  const product = JSON.parse(result.body);
  expect(result).toBeDefined();
  expect(product).toHaveProperty('description');
  expect(product).toHaveProperty('count');
  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('title');
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
