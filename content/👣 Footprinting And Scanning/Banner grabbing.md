---
title: "Banner grabbing"
draft: false
tags:
  - 
---
# Nmap

[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# NSE (banner grabbing)
nmap -sV -O --script=banner $IP
```

# Netcat

[Netcat](https://linux.die.net/man/1/nc) or `nc` utility is used for just about anything under the sun involving `TCP` or `UDP`.

```bash
nc -nv $IP $PORT
```
