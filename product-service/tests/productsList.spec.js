const { getProductsList } = require('../handler');

test('list of products is received', async () => {
  const result = await getProductsList();
  const productList = JSON.parse(result.body);
  expect(result).toBeDefined();
  expect(Array.isArray(productList)).toBe(true);

  const product = productList[0];

  expect(product).toHaveProperty('count');
  expect(product).toHaveProperty('description');
  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('title');
});
