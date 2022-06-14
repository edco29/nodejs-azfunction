const Joi = require("joi");

const { validateBody } = require("../midleware/validator");
const { getEntity } = require("../services/table-service");

const schema = Joi.object().keys({
  jiraProjectKey: Joi.string().uppercase().max(6).required(), // eg: PP
  jiraIssueNumber: Joi.number().integer().min(1).max(9999).required(), // eg: 22
});

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  await validateBody(context, context.req.body, schema);

  const { jiraProjectKey, jiraIssueNumber } = context.req.body;

  try {
    const result = await getEntity(jiraProjectKey, jiraIssueNumber);
    context.res = {
      status: 200,
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error,
    };
  }
};
