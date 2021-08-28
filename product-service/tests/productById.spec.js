const { getProductsById } = require('../handler');

test('list of products is received', async () => {
  const event = {
    pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a1' },
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
