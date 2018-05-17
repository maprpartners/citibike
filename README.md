# Citibike Demo with MapR Data Fabric for K8s on AWS Elastice Kubernetes Service (EKS)

Step 1: Create an EKS cluster by following this instruction

Step 2: Configure K8s client on MapR Sandbox, yes, we are going 

    login to the MapR Sandbox as centos using your private key that was given in Step 2, then 'sudo su' to become root

    git clone https://github.com/maprpartners/citibike.git

    cd citibike

    configure K8s

    bash config-k8s
    
    You will need to provide your AWS username, access key, secret and default zone (us-west-2) to configure the AWS Cli

    "kubectl get node -o wide" to verify it is working
    
Step 3: Create a MapR Sandbox in the same subnet where the K8s workers are in

    Go to https://tinyurl.com/y9jwz885
    
    Minimal required parameters are: KeyName, and VpcSubentid(this is the same subnet id where your K8s workers are in, use Subnet0)
    
    Also make sure that the network security group for the MapR Sandbox is modified to use the nsg of K8s workers

Step 4: Install MapR Data Fabric for K8s volume plugin

    bash inst_mapr_plugin 

    kubectl get pod --all-namespaces to verify, you should see mapr-kdfplugin-xxx     daemon set running on each K8s slave

Step 5: Deploy the citibike demo

    modify storage_class.yaml, add IP address of MapR node to CLDBHOSTs and IP
    
    bash run

    When completed, the script will provide a URL for you to look at the Demo


