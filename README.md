# Jira cycletime

The idea of this project is to measure the cycletime (cycle time is the time from when developers make a commit to the moment it's deployed to production. ). We are using azure functions to orquestrate the information from Jenkins and sending to an azure table storage and show it in powerBi

### Why not use jira cycletime report?

Jira cycle time report information is limited by the issues created in the current sprint but what about if we have 1 requirement that it needs more than 
1 sprint to be develop? in that case how should we measure the cycletime? for that reason we have created an async stack to store first commit , dev|qa|prod date regardless of the sprint they are in.

This repo contains a couple of nodejs azure function 

- CreatePartitionRowKey ( create partition and row key in azure table storage)
- ValidatePartitionRowKey (validate if partition and row key exits)
- PatchDeployInfoDev (update dev deployment information)
- PatchDeployInfoQa (update qa deployment information)
- PatchDeployInfoProd (update prod deployment information)



## Architecture



![architecture](https://user-images.githubusercontent.com/40572443/173856480-f37d587d-7dae-48c9-890b-06619b452859.png)


## PowerBI Report

![cycle-time-report](https://user-images.githubusercontent.com/40572443/174135172-51f55993-6921-4c3e-8cf5-f37b0ce3c80b.png)


## Azure Function Setup

Create the next variables:

- AZURE_SAS_TOKEN
- AZURE_STORE_ACCOUNT_URL
- AZURE_TABLE_NAME


Code reference ./services/table-service.js

`const sharedKeyCredential = new AzureSASCredential(process.env.AZURE_SAS_TOKEN);
const client = new TableClient(
  process.env.AZURE_STORE_ACCOUNT_URL,
  process.env.AZURE_TABLE_NAME,
  sharedKeyCredential
);`



## Integration Jenkins Pipeline

### Jenkins Parameters

JQL QUERY 

`project = "DP" AND (status IN ("In Progress") ) AND sprint in openSprints() ORDER BY created DESC`


![Screen Shot 2022-06-20 at 18 29 31](https://user-images.githubusercontent.com/40572443/174688686-2b70eabf-beec-4728-bc9c-659f92fd072e.png)

### Jenkins Build with parameters 

![Screen Shot 2022-06-20 at 18 30 22](https://user-images.githubusercontent.com/40572443/174688735-ed3e6af3-87f9-4cfb-bb77-e6943d1b13c1.png)



## Certification Jenkins Pipeline

### Jenkins Parameters

![Screen Shot 2022-06-20 at 18 31 03](https://user-images.githubusercontent.com/40572443/174688780-053b7ade-8996-4233-8557-a9c842883669.png)


![Screen Shot 2022-06-20 at 18 31 30](https://user-images.githubusercontent.com/40572443/174688813-310852df-b3be-4969-8082-1f3a63d985e5.png)

![Screen Shot 2022-06-20 at 18 31 47](https://user-images.githubusercontent.com/40572443/174688827-f7e01e0a-8a6f-4e5c-9a84-10741719efc3.png)

### Jenkins Build with parameters 

![Screen Shot 2022-06-20 at 18 32 58](https://user-images.githubusercontent.com/40572443/174688875-d13aa1d8-f8fc-4e64-a242-61633dd39aea.png)


## Production Jenkins Pipeline

### Jenkins Parameters

![Screen Shot 2022-06-20 at 18 35 36](https://user-images.githubusercontent.com/40572443/174689014-5d96d526-a6b8-4e5d-861d-287b6650e475.png)

![Screen Shot 2022-06-20 at 18 35 50](https://user-images.githubusercontent.com/40572443/174689031-59ba3072-8d80-468c-ad2d-f60a420c1c0a.png)
![Screen Shot 2022-06-20 at 18 36 00](https://user-images.githubusercontent.com/40572443/174689043-7110bf94-4c8e-4cf1-810e-c0f3f099dc50.png)

### Jenkins Build with parameters 
![Screen Shot 2022-06-20 at 18 36 31](https://user-images.githubusercontent.com/40572443/174689076-d1c20978-d6fc-45cb-a2de-9ea0177c554b.png)
