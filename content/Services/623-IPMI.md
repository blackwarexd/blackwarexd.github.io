---
title: "623-IPMI"
draft: false
tags:
  - 
---
The [Intelligent Platform Management Interface](https://www.thomas-krenn.com/en/wiki/IPMI_Basics) (**IPMI**) is a set of standardized specifications for hardware-based host management systems used for system management and monitoring. It acts as an autonomous subsystem and works independently of the host's BIOS, CPU, firmware, and underlying operating system.

`Default Port: 623`

# Banner grabbing
```bash
nc -nv -u $IP 623
```

# Used in ways
IPMI can also be used for remote upgrades to systems without requiring physical access to the target host. IPMI is typically used in three ways:
- Before the OS has booted to modify BIOS settings
- When the host is fully powered down
- Access to a host after a system failure

# To Function
To function, IPMI requires the following components:
- `Baseboard Management Controller` (**BMC**): A micro-controller and essential components of an IPMI.
- `Intelligent Chassis Management Bus` (**ICMB**): An interface that permits communication from one chassis to another.
- `Intelligent Platform Management Bus` (**IPMB**): extends the BMC.
- `IPMI Memory`: stores things such as the system event log, repository store data, and more.
- `Communications Interfaces`: local system interfaces, serial and LAN interfaces, ICMB and PCI Management bus.

# Nmap
[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Default NSE
sudo nmap -sCV -sU -p623 $IP

# Enum IPMI version
sudo nmap -p623 -sU --script=ipmi-version $IP
```

# Default Credentials
| Product         | Username      | Password                                                                  |
| --------------- | ------------- | ------------------------------------------------------------------------- |
| Dell iDRAC      | root          | calvin                                                                    |
| HP iLO          | Administrator | randomized 8-character string consisting of numbers and uppercase letters |
| Supermicro IPMI | ADMIN         | ADMIN                                                                     |

# Metasploit Framework
[Metasploit Framework](https://github.com/rapid7/metasploit-framework) is an open source platform that supports vulnerability research, exploit development, and the creation of custom security tools.

```bash
auxiliary/scanner/ipmi/ipmi_version     # Enum version
auxiliary/scanner/ipmi/ipmi_dumphashes  # Dumping HMAC-SHA1 password hashes
```