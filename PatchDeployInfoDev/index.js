const Joi = require("joi");
const { validateBody } = require("../midleware/validator");
const { updateEntity } = require("../services/table-service");

const schema = Joi.object().keys({
  jira_project_key: Joi.string().uppercase().max(6).required(), // eg: PP
  jira_issueNumber_dev: Joi.number().integer().min(1).max(9999).required(), // eg: 22
  deployment_date_dev: Joi.date().iso().max("now").required(),
  job_link_dev: Joi.string().required(),
});

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  await validateBody(context, context.req.body, schema);

  const { jira_project_key, jira_issueNumber_dev , deployment_date_dev , job_link_dev } = context.req.body;

  const tableData = {
    partitionKey: jira_project_key,
    rowKey: jira_issueNumber_dev,
    deployment_date_dev: deployment_date_dev,
    job_link_dev: job_link_dev,
  };

  try {
    const result = await updateEntity(tableData);
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
