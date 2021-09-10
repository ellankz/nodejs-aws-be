export const logRequest = (event) => {
  const { pathParameters, body, path, httpMethod, queryStringParameters } =
    event;
  console.log('parameters:', pathParameters);
  console.log('body:', body);
  console.log('path:', path);
  console.log('method:', httpMethod);
  console.log('query:', JSON.stringify(queryStringParameters));
};
