function createResponse(data) {
  const statusCode = 200;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const body = JSON.stringify(data);

  return { statusCode, headers, body };
}

const defaults = {
  test: 'Hello, world!',
};

exports.handler = async function handler(event, context) {
  const { queryStringParameters = {} } = event || {};

  const options = Object.assign({}, defaults, queryStringParameters);

  const { test } = options;

  const data = { test };

  try {
    context.done(null, createResponse(data));
  } catch (e) {
    context.done(e);
  }
};
