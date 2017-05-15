---
layout: page
title: "Welcome to Portworx Docs"
keywords: portworx, px-enterprise, px-developer, containers, storage
sidebar: home_sidebar
youtubeId : 0zTjOly0vkA
---

* TOC
{:toc}

<a href="https://github.com/portworx/px-docs"><img class="topfork" width="149px" height="149px" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>

Portworx is a software defined persistent storage solution designed and purpose built for containers.  Portworx is a clustered block storage solution that provides a Cloud-Native layer from which containerized stateful applications programmatically consume storage services directly through schedulers such as Kubernetes, Mesos and Swarm.
Portworx storage is delivered as a container that gets installed on your servers that run stateful applications. 

Portworx technology:

* Provides virtual, container-granular data volumes to applications running in containers.
* Is scheduler aware - provides data persistence and HA across multiple nodes, cloud instances, regions, data centers or even clouds.
* Is application aware - applications like Cassandra are deployed as a set of containers, and Portworx is aware of the entire stack.  Data placement and management is done at an application POD level.
* Manages physical storage that is directly attached to servers, from cloud volumes, or provided by hardware arrays.
* Provides programmatic control on your storage resources - volumes and other stateful services can be created and consumed directly via the scheduler and orchestration software tool chain.
* Is radically simple - Portworx is deployed just like any other container - and managed by your scheduler of choice.

## Data Service Platform
Here is a short video that shows how Portworx provides an entire platform of services for managing stateful containerized applications in any Cloud or On-Prem data center:
{% include youtubePlayer.html id=page.youtubeId %}

Portworx storage is deployed as a container and runs on a cluster of servers. Application containers provision storage directly through the Docker [volume plugins](https://docs.docker.com/engine/extend/plugins_volume/#command-line-changes:be52bcf493d28afffae069f235814e9f) API or the Docker [command-line](https://docs.docker.com/engine/extend/plugins_volume/#command-line-changes:be52bcf493d28afffae069f235814e9f). Administrators and DevOps can alternatively pre-provision storage through the Portworx command-line tool (**pxctl**) and then set storage policies using the PX-Enterprise web console.

Portworx storage runs in a cluster of server nodes.

Each server has the Portworx container and the Docker daemon.
Servers join a cluster and share configuration through PX-Enterprise or the key/value store, such as etcd.
The Portworx container pools the capacity of the storage media residing on the server. You easily select storage media through the [config.json](https://raw.githubusercontent.com/portworx/px-dev/master/conf/config.json) file.

![Portworx cluster architecture](/images/cluster-architecture.png "Portworx cluster architecture"){:width="442px" height="492px"}

Storage volumes are thinly provisioned, using capacity only as an application consumes it. Volumes are replicated across the nodes within the cluster, per a volume’s configuration, to ensure high availability.

Using MySQL as an example, a Portworx storage cluster has the following characteristics:

* MySQL is unchanged and continues to write its data to /var/lib/mysql.
* This data gets stored in the container’s volume, managed by Portworx.
* Portworx synchronously and automatically replicates writes to the volume across the cluster.

![Portworx cluster architecture with MySQL](/images/cluster-architecture-example-mysql.png "Portworx cluster architecture with MySQL"){:width="839px" height="276px"}

Each volume specifies its request of resources (such as its max capacity and IOPS) and its individual requirements (such as ext4 as the file system and block size).

Using IOPS as an example, a team can choose to set the MySQL container to have a higher IOPS than an offline batch processing container. Thus, a container scheduler can move containers, without losing storage and while protecting the user experience.

## Install
Visit the Schedulers section of this documentation, and chose the appropriate installation instructions for your scheduler.

* [Install on Kubernetes](/scheduler/kubernetes/install.html)
* [Install on Mesosphere DCOS](/scheduler/mesosphere-dcos/install.html)
* [Install on Docker](/scheduler/docker/install.html)
* [Install on Rancher](/scheduler/rancher/install.html)

## Join us on Slack!
[![](/images/slack.png){:height="48px" width="48px" .slack-icon}](http://slack.portworx.com)

[Contact us](http://portworx.com/contact-us/) to share feedback, work with us, and to request features.
