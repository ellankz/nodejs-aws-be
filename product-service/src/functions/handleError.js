export const handleError = (status) => {
  const errors = [];
  errors[404] = 'Not found';

  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      code: status,
      status: errors[status],
    }),
  };
};
