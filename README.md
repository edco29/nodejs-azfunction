# JIRA CYCLETIME

The idea of this project measures the cycletime (from first commit until production deployment). We are using azure functions to orquestrate the information from Jenkins and sending to an azure table storage and show it in powerBi

### ¿Why not use jira cycle time report?

Jira cycle time report information is limited by the issues created in the current sprint but what about if we have 1 requirement that it needs more than 
1 sprint to be develope ? in that case how should we measure the cycletime? for that reason we have created an async stack to store first commit , dev|qa|prod date regardless of the sprint they are in.

This repo contains a couple of nodejs azure function 

- CreatePartitionRowKey
- ValidatePartitionRowKey
- PatchDeployInfoDev
- PatchDeployInfoQa
- PatchDeployInfoProd



## Architecture



![architecture](https://user-images.githubusercontent.com/40572443/173856480-f37d587d-7dae-48c9-890b-06619b452859.png)


## PowerBi Report


![cycletime-report-bi](https://user-images.githubusercontent.com/40572443/173860971-cbe8c662-8b80-4367-a0e1-75d18940f968.png)
