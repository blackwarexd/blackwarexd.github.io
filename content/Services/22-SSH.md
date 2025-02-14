---
title: "22-SSH"
draft: false
tags:
  - 
---
The `Secure Shell Protocol` (**SSH**) is a cryptographic network protocol for operating network services securely over an unsecured network. Its most notable applications are remote `login` and `command-line` execution.

SSH can be configured with password authentication or passwordless using [public-key authentication](https://serverpilot.io/docs/how-to-use-ssh-public-key-authentication/) using an SSH public/private key pair.

`Default Port: 22`

# Banner grabbing

```bash
nc -nv $IP 22
```

# Nmap

[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Enum authentication methods
sudo nmap -p22 --script=ssh-auth-methods --script-args="ssh.user=root" $IP

# Enum algorithm used
sudo nmap -p22 --script=ssh2-enum-algos $IP

# Enum hostkey server's fingerprint
sudo nmap -p22 --script=ssh-hostkey --script-ags ssh_hostkey=full $IP

# Bruteforcing
sudo nmap -p22 --script=ssh-brute --script-args userdb=/wordlists/users.txt $IP
```

# Hydra

[Hydra](https://github.com/vanhauser-thc/thc-hydra) is a `parallelized` login cracker which `supports numerous protocols` to attack. It is very fast and flexible, and new modules are easy to add.

```bash
hydra -L /wordlists.txt/users.txt -P /wordlists/passwords.txt $IP ssh
```

# Metasploit Framework

[Metasploit Framework](https://github.com/rapid7/metasploit-framework) is an open source platform that supports vulnerability research, exploit development, and the creation of custom security tools.

```bash
auxiliary/scanner/ssh/ssh_version          # SSH version scanner
auxiliary/scanner/ssh/ssh_login            # SSH login check scanner
auxiliary/scanner/ssh/ssh_enumusers        # SSH username enumeration

# Check if SSH vulnerable to AUTHENTICATION bypass
auxiliary/scanner/ssh/libssh_auth_bypass
```
