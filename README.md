# citibike

create a MapR Sandbox

https://bit.ly/2jINu8c

create a AKS K8 cluster in the same vnet as MapR Sandbox

manually using portal

Assign service principal AKSClusterxxxx as owner for the RG just created for MapR Sandbox

login to Sandbox, sudo to become root

curl -L https://raw.githubusercontent.com/maprpartners/citibike/master/inst_tools | bash

Follow the instructions to login to your Azure account
use  az account set if you have multiple subscriptions, use az aks list to find out K8s cluster name

git clone https://github.com/maprpartners/citibike.git

cd citibike

Install MapR volume plugin

bash inst_mapr_plugin | bash

Deploy the citibike demo

bash run


