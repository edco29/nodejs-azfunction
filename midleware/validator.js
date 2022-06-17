async function validateBody(context, body, schema) {
  context.log("Validating schema body");
  try {
    if (!body) {
      context.res = {
        status: 400,
        body: "Request body is empty.",
      };
    }
    await schema.validateAsync(body);
    context.log("Successful scheme validation ");
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message,
    };
  }
}

exports.validateBody = validateBody;
