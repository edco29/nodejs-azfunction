# JIRA CYCLETIME

The idea of this project is the measurement of the cycletime (from first commit to the production deployment). We are using azure functions to orquestrate the information from Jenkins and sending to an azure table storage and show it in powerBi

### WHY NOT USE JIRA CYCLE TIME REPORT ?

Jira cycle time report information is limited by the issues created in the current sprint but what about if we have 1 requirement that it needs more than 
1 sprint to be develop? in that case how should we measure the cycletime? for that reason we have created an async stack to store first commit , dev|qa|prod date regardless of the sprint they are in.

This repo contains a couple of nodejs azure function 

- CreatePartitionRowKey ( create partition and row key in azure table storage)
- ValidatePartitionRowKey (validate if partition and row key exits)
- PatchDeployInfoDev (update dev deployment information)
- PatchDeployInfoQa (update qa deployment information)
- PatchDeployInfoProd (update prod deployment information)



## ARCHITECTURE



![architecture](https://user-images.githubusercontent.com/40572443/173856480-f37d587d-7dae-48c9-890b-06619b452859.png)


## POWERBI REPORT

![cycle-time-report](https://user-images.githubusercontent.com/40572443/174135172-51f55993-6921-4c3e-8cf5-f37b0ce3c80b.png)


