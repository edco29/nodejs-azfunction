const Joi = require("joi");

const { validateBody } = require("../midleware/validator");
const { getEntity } = require("../services/table-service");

const schema = Joi.object().keys({
  jira_project_key: Joi.string().uppercase().max(6).required(), // eg: PP
  jira_issueNumber_dev: Joi.number().integer().min(1).max(9999).required(), // eg: 22
});

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const jira_project_key  = req.query.jira_project_key
  const jira_issueNumber_dev  = req.query.jira_issueNumber_dev

  const body = {
    jira_project_key : jira_project_key ,
    jira_issueNumber_dev : jira_issueNumber_dev
  }
  
  await validateBody(context, body, schema);


  try {
    const result = await getEntity(jira_project_key, jira_issueNumber_dev);
    context.res = {
      status: 200,
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: error,
    };
  }
};
