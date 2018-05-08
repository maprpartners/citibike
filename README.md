# citibike

create a MapR Sandbox

https://bit.ly/2jINu8c

create a AKS K8 cluster in the same vnet as MapR Sandbox

manually using portal

Assign service principal AKSClusterxxxx as owner for the RG just created for MapR Sandbox

login to Sandbox, sudo to become root

git clone https://github.com/maprpartners/citibike.git

cd citibike

bash inst_tools

Install MapR volume plugin

bash inst_mapr_plugin | bash

Deploy the citibike demo
bash run


