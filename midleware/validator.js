async function validateBody(context, body, schema) {
  try {
    if (!body) {
      context.res = {
        status: 400,
        body: "Request body is empty.",
      };
      context.done();
    }
    await schema.validateAsync(body);
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message,
    };
    context.done();
  }
}

exports.validateBody = validateBody;
