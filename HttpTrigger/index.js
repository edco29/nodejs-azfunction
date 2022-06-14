const { TableClient, AzureSASCredential } = require("@azure/data-tables");

const sharedKeyCredential = new AzureSASCredential(
  "?sv=2021-06-08&ss=t&srt=sco&sp=rwdlacu&se=2023-03-03T02:04:39Z&st=2022-06-10T18:04:39Z&spr=https&sig=5E9jDFRlRAfhe%2BfQVq9aOSip67XpxzaSyxHxydilofw%3D"
);
const client = new TableClient(
  `https://mlops3264447618.table.core.windows.net`,
  `cycletimebaufest`,
  sharedKeyCredential
);

/*
  Main Azure Function Http Trigger
*/

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed");

  const environment = req.body.environment;

  if (environment == "dev") {
    /*
        validate if partition key exits  , many dev deploy 
    */
    const devjiraIssue = req.body.jira_issues.dev.issue_key.split("-");
    const partitionKey = devjiraIssue[0];
    const rowKey = devjiraIssue[1];
    const exits = await validateIfExistKey(partitionKey, rowKey, context);

    if (!exits) {
      /*
         If keys does not exits , create partitionkey and rowKey ( first time)
        */
      context.log("Creating Key.......");
      const tableData = {
        partitionKey: partitionKey,
        rowKey: rowKey,
        issuekey_dev: req.body.jira_issues.dev.issue_key,
        first_commit_message: req.body.build_info.first_commit_message,
        first_commit_date: req.body.build_info.first_commit_date,
        first_commit_hash: req.body.build_info.first_commit_hash,
        deployment_date_dev: req.body.deployment_info.dev.deployment_date,
        job_link_dev: req.body.deployment_info.dev.job_link ?? "none",
      };

      await client.createEntity(tableData);
    } else {
      /*
        if partitionkey and rowkey exits , update only deployment time
    */
      context.log("Updating Key.......");
      const deploymentDevInfo = {
        partitionKey: partitionKey,
        rowKey: rowKey,
        deployment_date_dev: req.body.deployment_info.dev.deployment_date,
        job_link_dev: req.body.deployment_info.dev.job_link,
      };

      await client.upsertEntity(deploymentDevInfo, "Merge");
    }
  } else if (environment == "cert") {
    /*  
        get unique identifier : partionkey and rowkey
    */

    const devjiraIssue = req.body.jira_issues.dev.issue_key.split("-");

    const partitionKey = devjiraIssue[0];
    const rowKey = devjiraIssue[1];

    const exits = await validateIfExistKey(partitionKey, rowKey, context);

    if (!exits) {
      context.done(
        `partitionKey "${partitionKey}" and rowKey "${rowKey}" does not exits`
      );
    }
    /*

        if partitionkey and rowkey exits (must exits), update only deployment time
    */
    context.log("Updating Key.......");
    const tableData = {
      partitionKey: partitionKey,
      rowKey: rowKey,
      issuekey_cert: req.body.jira_issues.cert.issue_key,
      deployment_date_cert: req.body.deployment_info.cert.deployment_date,
      job_link_cert: req.body.deployment_info.cert.job_link ?? "none",
    };

    await client.upsertEntity(tableData, "Merge");
  } else if (environment == "prod") {
    /*  
        get unique identifier : partionkey and rowkey
    */

    const devjiraIssue = req.body.jira_issues.dev.issue_key.split("-");

    const partitionKey = devjiraIssue[0];
    const rowKey = devjiraIssue[1];

    const exits = await validateIfExistKey(partitionKey, rowKey, context);

    if (!exits) {
      context.done(
        `partitionKey "${partitionKey}" and rowKey "${rowKey}" does not exits`
      );
    }

    /*

        if partitionkey and rowkey exits (must exits), update only deployment time
    */
    context.log("Updating Key.......");
    const tableData = {
      partitionKey: partitionKey,
      rowKey: rowKey,
      issuekey_prod: req.body.jira_issues.prod.issue_key,
      deployment_date_prod: req.body.deployment_info.prod.deployment_date,
      job_link_prod: req.body.deployment_info.prod.job_link ?? "none",
    };

    await client.upsertEntity(tableData, "Merge");
  } else {
    context.done(`environment "${environment}" does not exits`);
  }

  context.res = {
    status: 200,
  };
};

/*
    Validate if partitionkey and Rowkey exits
*/
// Promise<GetTableEntityResponse<TableEntityResult<T>>>
async function validateIfExistKey(partitionKey, rowKey, context) {
  return (exitsKey = await client
    .getEntity(partitionKey, rowKey)
    .then((data) => {
      context.log(data);
      return true;
    })
    .catch((data) => {
      context.log(data);
      return false;
    }));
}
