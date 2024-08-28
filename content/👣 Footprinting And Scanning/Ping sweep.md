---
title: "Ping sweep"
draft: false
tags:
  - 
---
# Nmap

[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Scan IP Subnets
sudo nmap -sn -oN output.txt $IP/24 | grep for | cut -d" " -f5

# Scan IP List File
sudo nmap -sn -iL iplist.txt -oN output.txt | grep for | cut -d" " -f5

# Scan IP Range Octet
sudo nmap -sn -oN output.txt $IP-20 | grep for | cut -d" " -f5

# Trace ARP/ICMP Reply
sudo nmap -sn -oN output.txt $IP -PE --packet-trace

# Show the reason target marked "alive"
sudo nmap -sn -oN output.txt $IP -PE --reason

# Only ICMP without Arp Ping
sudo nmap -sn -oN output.txt $IP -PE --packet-trace --disable-arp-ping
```

# Ping

[Ping](https://linux.die.net/man/8/ping) uses the ICMP protocol's mandatory `ECHO_REQUEST` datagram to elicit an `ICMP ECHO_RESPONSE` from a host or gateway.

```bash
# ping command
ping -c 1 $IP
```

```bash title="pingsweep.sh"
#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "usage: $0 <subnet> <netmask>"
    echo "example: $0 192.168.1 24"
    exit 1
fi

SUBNET=$1
NETMASK=$2
ADDR_COUNT=$((2 ** (32 - NETMASK)))

for i in $(seq 1 $((ADDR_COUNT - 2))); do
    IP="${SUBNET}.$i"
    ping -c 1 "$IP" > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "$IP" is up
    fi
done

echo "scanning complete."
```

# Fping

[Fping](https://fping.org/) is a program to send ICMP echo probes to network hosts, similar to `ping`, but much better performing when pinging multiple hosts.

```bash
# Entire subnets
fping -I eth0 -g $IP/24 -a 2>/dev/null
```

# Arp-Scan

[Arp-Scan](https://github.com/royhills/arp-scan) is a network scanning tool that uses the `ARP` protocol to discover and fingerprint IPv4 hosts on the local network.

```bash
# Get the IP and MAC address
sudo arp-scan -I eth0 -g $IP/24
```