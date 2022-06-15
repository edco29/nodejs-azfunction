# JIRA CYCLETIME

The idea of this project is measure the cycletime ( from first commit until  production deployment) .
We are using azure function to orquestrate the information  from jenkins and sending to an azure table storage and show it in powerBi

### ¿Why not use jira cycle time report?

Jira cycle time report information is limitated by the issues created in the current sprint but what about if we have 1 requirement that it need more than 
1 sprint to be develope ?  for that reason we have created an async stack to store first commit , dev|qa|prod date regardless of the sprint they are in.

This repo contains a couple of nodejs azure function 

- CreatePartitionRowKey
- ValidatePartitionRowKey
- PatchDeployInfoDev
- PatchDeployInfoQa
- PatchDeployInfoProd



## Architecture



![Screen Shot 2022-06-15 at 09 46 23](https://user-images.githubusercontent.com/40572443/173856480-f37d587d-7dae-48c9-890b-06619b452859.png)
