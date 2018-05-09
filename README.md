# citibike

create a MapR Sandbox

https://bit.ly/2jINu8c

create a AKS K8 cluster in the same vnet as MapR Sandbox

manually using portal

Assign service principal AKSClusterxxxx as contributor for the RG just created for MapR Sandbox, also add self as the owner of Service principal

login to Sandbox, sudo to become root

configure azcli

curl -L https://raw.githubusercontent.com/maprpartners/citibike/master/config-azcli | bash

Follow the instructions to login to your Azure account

use  az account set if you have multiple subscriptions, use az aks list to find out K8s cluster name

configure k8s

curl -L https://raw.githubusercontent.com/maprpartners/citibike/master/config-k8s | bash

kubectl get node -o wide

git clone https://github.com/maprpartners/citibike.git

cd citibike

Install MapR volume plugin

bash inst_mapr_plugin 

kubectl get pod --all-namespaces

Deploy the citibike demo

bash run


