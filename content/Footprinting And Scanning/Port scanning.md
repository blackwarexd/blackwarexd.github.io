---
title: "Port scanning"
draft: false
tags:
  - 
---
# Nmap

[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# All Port Scan
sudo nmap -p- --min-rate=1000 $IP
sudo nmap -p- --min-rate=1000 -oN nmap/allports $IP --open

# Script Port Scan
sudo nmap -p$PORT -sCV -oN nmap/output.txt $IP

# Script Vuln/Tag Port Scan
sudo nmap -p$PORT -sV --script=vuln -oN nmap/output.txt $IP

# Script port scan with exception
sudo nmap -sV --script "ldap* and not brute" -oN nmap/output.txt $IP

# UDP top100 ports
sudo nmap -sU -F $IP -oN output.txt

# Output XML to HTML
xsltproc output.xml -o output.html

# Grab all ports in output file
cat nmap/allports | grep "open" | grep -v "filtered" | cut -d "/" -f1 | sort -u | xargs | tr ' ' ',' > ports.txt
cat nmap/allports | grep "open" | grep -v "filtered" | cut -d "/" -f1 | sort -u | xargs | tr ' ' ',' | xclip -selection clipboard
```

# Netcat

[Netcat](https://linux.die.net/man/1/nc) or `nc` utility is used for just about anything under the sun involving `TCP` or `UDP`.

```bash
# All TCP port scan
nc -zv $IP 01-65535

# All UDP port scan
nc -zv -u $IP 01-65535 
```
