# Build Something
This is a simple todo-list microservice with frontend, API and database

# Utilizing ingress
To make use this exact code please add to file /etc/hosts
"127.0.0.1 todo.local"

This allowes to reach the ingress controller at [http](http://todo.local/)


# Requirements
This project was run using microk8s, all .sh scripts are therefore written for microk8s
The project was also developed using python 3.13 and is therefore reccomended

# Turn on Application
command: ./on.sh

# Turn off Application
command: ./off.sh

# MicroK8s
If using Microk8s it's reccomended to use this configuration:
ha-cluster: diable
dns: enable
ingress: enabled
hostpath-storage: enable