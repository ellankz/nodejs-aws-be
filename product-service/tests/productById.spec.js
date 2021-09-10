const { getProductsById } = require('../handler');

test('product info is received', async () => {
  const event = {
    pathParameters: { productId: 'da2f263b-a12e-4588-ac1b-49353559a467' },
  };

  const result = await getProductsById(event);
  const product = JSON.parse(result.body);
  expect(result).toBeDefined();
  expect(product).toHaveProperty('count');
  expect(product).toHaveProperty('description');
  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('title');
});

test('not found error is received', async () => {
  const event = {
    pathParameters: { productId: '01630ecd-01bf-48a0-9051-8e688872fe6b' },
  };

  const result = await getProductsById(event);
  const product = JSON.parse(result.body);

  expect(result).toBeDefined();
  expect(product).toHaveProperty('code');
  expect(product).toHaveProperty('status');
});
