---
layout: page
title: "Run Portworx with Mesosphere/DCOS"
keywords: portworx, PX-Developer, container, Mesos, Mesosphere, storage
---

* TOC
{:toc}

This DCOS service will deploy Portworx as well as all the dependencies and additional services to manage the Portworx
cluster. This includes a highly available etcd cluster, influxdb to store statistics and the Lighthouse service, which is
the Web UI for Portworx.

Portworx can be used to provision volumes on DCOS using either the Docker Volume Driver Interface (DVDI) or, directly through
CSI.

## Deploy Portworx
### Adding the repository for the service:

For this step you will need to login to a node which has the dcos cli installed and is authenticated to your DCOS cluster.

Run the following command to add the repository to your DCOS cluster:

```
$ dcos package repo add --index=0 portworx https://px-dcos.s3.amazonaws.com/v1/portworx/portworx.zip
```

Once you have run the above command you should see the Portworx service available in your universe

![Portworx in DCOS Universe](/images/dcos-px-universe.png){:width="655px" height="200px"}

### Default Install
If you want to use the defaults, you can now run the dcos command to install the service
```
$ dcos package install --yes portworx
```
You can also click on the  “Install” button on the WebUI next to the service and then click “Install Package”.

This will install all the pre-requisites and start the Portworx service on 3 private agents.

### Advanced Install
If you want to modify the default, click on the “Install” button next to the package on the DCOS UI and then click on
“Advanced Installation”

Through the advanced install options you can change the configuration of the Portworx deployment. Here you can choose to
disable etcd (if you have an external etcd service) as well as disable the Lighthouse service in case you do not want to
use the WebUI.

### Portworx Options
Specify your kvdb (consul or etcd) server if you don't want to use the etcd cluster with this service. If the etcd cluster
is enabled this config value will be ignored.
![Portworx Install options](/images/dcos-px-install-options-1.png){:width="655px" height="200px"}

### Etcd Options
You can also change the number of etcd nodes in the etcd cluster.
![Portworx ETCD Install options](/images/dcos-px-install-options-2.png){:width="655px" height="200px"}

### Lighthouse options
By default the Lighthouse service will be installed. If this is disabled the influxdb service will also be disabled.

![Portworx Lighthouse Install options](/images/dcos-px-install-options-3.png){:width="655px" height="200px"}

Once you have configured the service, click on “Review and Install” and then “Install” to start the installation of the
service.

## Install Status

Once you have started the install you can go to the Services page to monitor the status of the installation.

If you click on the Portworx service you should be able to look at the status of the services being created. 

In a default install there will be one service for the framework scheduler, 5 services for etcd (one for the etcd scheduler,
3 etcd nodes and one etcd proxy), one service for influxdb and one service for lighthouse.

![Portworx Install finished](/images/dcos-px-install-finished.png){:width="655px" height="200px"}

The install for Portworx on the agent nodes will also run as a service but they will "Finish" once the installation is done.

You can check the nodes where Portworx is installed and the status of the Portworx service by clicking on the Components
link on the DCOS UI.
![Portworx in DCOS Compenents](/images/dcos-px-components.png){:width="655px" height="200px"}

## Accessing Lighthouse

Since Lighthouse is deployed on a private agent it might not be accessible from outside your network depending on your
network configuration. To access Lighthouse from an external network you can deploy the [Repoxy](https://gist.github.com/nlsun/877411115f7e3b885b5e9daa8821722f) service to redirect traffic
from one of the public agents.

To do so, run the following marathon application

```
{
  "id": "/repoxy",
  "cpus": 1,
  "acceptedResourceRoles": [
      "slave_public"
  ],
  "instances": 1,
  "mem": 512,
  "container": {
    "type": "DOCKER",
    "docker": {
      "image": "mesosphere/repoxy:2.0.0"
    },
    "volumes": [
      {
        "containerPath": "/opt/mesosphere",
        "hostPath": "/opt/mesosphere",
        "mode": "RO"
      }
    ]
  },
  "cmd": "/proxyfiles/bin/start portworx $PORT0",
  "portDefinitions": [
    {
      "port": 0,
      "protocol": "tcp"
    },
    {
      "port": 0,
      "protocol": "tcp"
    }
  ],
  "env": {
    "PROXY_ENDPOINT_0": "Lighthouse,http,lighthouse-0-start,mesos,80,/,/"
  }
}
```

Once the app is running, look at the logs for the service. You should see a message similar to the following:
```
The proxy is listening on port: 20174

Lighthouse: 54.89.188.212:20174/
```

You can then use that URL to access the Lighthouse WebUI
