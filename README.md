# citibike

create a MapR Sandbox
https://bit.ly/2jINu8c

create a AKS K8 cluster in the same vnet as MapR Sandbox
manually using portal

login to Sandbox, sudo to become root
curl -L https://raw.githubusercontent.com/maprpartners/citibike/master/inst_tools | bash

Install MapR volume plugin
curl -L https://raw.githubusercontent.com/maprpartners/citibike/master/inst_mapr_plugin | bash
