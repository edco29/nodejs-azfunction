const Joi = require("joi");
const { validateBody } = require("../midleware/validator");
const { updateEntity } = require("../services/table-service");

const schema = Joi.object().keys({
  jira_project_key: Joi.string().uppercase().max(6).required(), // eg: PP
  jira_issueNumber_dev: Joi.number().integer().min(1).max(9999).required(),
  jira_issueNumber_cert: Joi.number().integer().min(1).max(9999).required(), // eg: 22
  deployment_date_cert: Joi.date().iso().max("now").required(),
  job_link_cert: Joi.string().required(),
});

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  await validateBody(context, context.req.body, schema);

  const {
    jira_project_key,
    jira_issueNumber_dev,
    deployment_date_cert,
    jira_issueNumber_cert,
    job_link_cert,
  } = context.req.body;

  const tableData = {
    partitionKey: jira_project_key,
    rowKey: jira_issueNumber_dev,
    deployment_date_cert: deployment_date_cert,
    issuekey_cert: jira_project_key + "-" + jira_issueNumber_cert,
    job_link_cert: job_link_cert,
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
