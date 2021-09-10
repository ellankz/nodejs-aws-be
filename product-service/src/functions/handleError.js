export const handleError = (status) => {
  const errors = [];
  errors[404] = 'Not found';
  errors[400] = 'Bad request';
  errors[500] = 'Internal server error';

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
