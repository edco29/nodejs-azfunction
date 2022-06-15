const Joi = require("joi");

const { validateBody } = require("../midleware/validator");
const { getEntity } = require("../services/table-service");

const schema = Joi.object().keys({
  jira_project_key: Joi.string().uppercase().max(6).required(), // eg: PP
  jira_issueNumber_dev: Joi.number().integer().min(1).max(9999).required(), // eg: 22
});

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  await validateBody(context, context.req.body, schema);

  const { jira_project_key, jira_issueNumber_dev } = context.req.body;

  try {
    const result = await getEntity(jira_project_key, jira_issueNumber_dev);
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
