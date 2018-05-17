# Citibike Demo with MapR Data Fabric for K8s

Step 1: Create an EKS cluster by following this instruction

Step 2: Create a MapR Sandbox in the same subnet where the K8s workers are in

    Go to https://tinyurl.com/y9jwz885

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


