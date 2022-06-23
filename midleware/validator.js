async function validateBody(context, body, schema) {
  context.log("Validating schema body");
  try {
    if (!body) {
      context.res = {
        status: 422,
        body: "Request body is empty.",
      };
      context.done()
      return
    }
    await schema.validateAsync(body);
    context.log("Successful scheme validation ");
  } catch (error) {
    context.res = {
      status: 422,
      body: error.message,
    };
    context.done()
    throw new Error(error.message)
  }
}

exports.validateBody = validateBody;
