# NYC Citi Bike Demo with MapR Data Fabric for K8s on AWS Elastice Kubernetes Service (EKS)

![Alt text](https://github.com/maprpartners/citibike/blob/master/citibike-grafana.png?raw=true "NYC CitiBike")

Below is the architecture of the Demo and the data flow

![Alt text](https://github.com/maprpartners/citibike/blob/master/demoarch.png "NYC CitiBike Demo Arch")

Step 1: Create an EKS cluster by following this instruction

    https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
    
Step 2: Create a MapR Sandbox in the same subnet where the K8s workers are in

    Go to https://tinyurl.com/y9jwz885
    
    Minimal required parameters are: KeyName, and VpcSubentid(this is the same subnet id where your K8s workers are in, use Subnet0)
    
    Also make sure that the network security group for the MapR Sandbox is modified to use the nsg of K8s workers

Step 3: Configure AWS Cli client on MapR Sandbox

    In about 20 minutes, you will see a new VM in your EC2 portal named 'mapr600_sandbox_demo'. This is the MapR Sandbox.
    login to the MapR Sandbox as centos using your private key that was given in Step 2, then 'sudo su' to become root. 
    You will need to provide your AWS username, access key, secret and default zone (us-west-2) to configure the AWS Cli
    
    #yum -y install git
    #pip install awscli
    #aws configure  

Step 4: Install MapR Data Fabric for K8s volume plugin

    #git clone https://github.com/maprpartners/citibike.git  
    #cd citibike 
    #bash inst_mapr_plugin 
    
    To verify, you should see mapr-kdfplugin-xxx daemon set running on each K8s slave
    #kubectl get pod --all-namespaces

Step 5: Deploy the citibike demo
 
    #bash run

    When completed, the script will provide a URL for you to look at the real world demo in action

