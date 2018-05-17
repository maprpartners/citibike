# Citibike Demo with MapR Data Fabric for K8s

Step 1: Create an EKS cluster by following this instruction

Step 2: Create a MapR Sandbox in the same subnet where the K8s workers are in

    Go to https://tinyurl.com/y9jwz885

Step 2: Create a AKS K8 cluster in the same vnet as MapR Sandbox

    Manually using the Azure portal: https://portal.azure.com

    Use the existing MapR Sandbox resource group in Step 1 when prompted.

    Assign service principal AKSClusterxxxx as contributor for the RG just created for MapR Sandbox, also add self as the owner of Service principal

Step 3: Install Azure Cli Tool

    login to Sandbox, sudo to become root

    curl -L https://raw.githubusercontent.com/maprpartners/citibike/master/config-azcli | bash

    Follow the instructions to login to your Azure account

    use "az account set" if you have multiple subscriptions, 

    use "az aks list" to find out K8s cluster name from Step 2 if you forgot


Step 4: Configure K8s client on MapR Sandbox

    login to the MapR Sandbox as root

    git clone https://github.com/maprpartners/citibike.git

    cd citibike

    configure K8s

    bash config-k8s

    "kubectl get node -o wide" to verify it is working

Step 5: Install MapR Data Fabric for K8s volume plugin

    bash inst_mapr_plugin 

    kubectl get pod --all-namespaces to verify, you should see mapr-kdfplugin-xxx     daemon set running on each K8s slave

Step 6: Deploy the citibike demo

    modify storage_class.yaml, add IP address of MapR node to CLDBHOSTs and IP
    
    bash run

    When completed, the script will provide a URL for you to look at the Demo


