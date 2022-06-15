const { TableClient, AzureSASCredential } = require("@azure/data-tables");

const sharedKeyCredential = new AzureSASCredential(process.env.AZURE_SAS_TOKEN);
const client = new TableClient(
  process.env.AZURE_STORE_ACCOUNT_URL,
  process.env.AZURE_TABLE_NAME,
  sharedKeyCredential
);

async function getEntity(partitionKey, rowKey) {
  return await client
    .getEntity(partitionKey, rowKey)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

async function createEntity(tableData) {
  return await client
    .createEntity(tableData)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

async function updateEntity(tableData) {
  return await client
    .updateEntity(tableData, "Merge")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

exports.getEntity = getEntity;
exports.createEntity = createEntity;
exports.updateEntity = updateEntity;
