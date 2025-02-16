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
# Default NSE
sudo nmap -sCV -p22 $IP

# Enum authentication methods
sudo nmap -p22 --script=ssh-auth-methods --script-args="ssh.user=root" $IP

# Enum algorithm used
sudo nmap -p22 --script=ssh2-enum-algos $IP

# Enum hostkey server's fingerprint
sudo nmap -p22 --script=ssh-hostkey --script-ags ssh_hostkey=full $IP

# Bruteforcing
sudo nmap -p22 --script=ssh-brute --script-args userdb=/wordlists/users.txt $IP
```

# SSH
SSH (**SSH client**) is a program for logging into a remote machine and for executing commands on a remote machine.

If you counter this [error](https://transang.me/ssh-handshake-is-rejected-with-no-mutual-signature-algorithm-error/) while connect to it: `sign_and_send_pubkey: no mutual signature supported`
```bash
# Offer the RSA algorithm
ssh -o 'PubkeyAcceptedKeyTypes +ssh-rsa' -i key administrator@$IP
```

If you counter this [error](https://www.infosecmatter.com/solution-for-ssh-unable-to-negotiate-errors/): (**such as**)
> [!warning]
> Unable to negotiate with `$IP` port 22: no matching key exchange method found. Their offer: diffie-hellman-group1-sha1
> 
> Unable to negotiate with `$IP` port 22: no matching key exchange method found. Their offer: diffie-hellman-group-exchange-sha1,diffie-hellman-group14-sha1,diffie-hellman-group1-sha1

```bash
# Offer the accepted algorithm
ssh -oKexAlgorithms=+diffie-hellman-group1-sha1 administrator@$IP
```

# SSH-audit
[SSH-audit](https://github.com/jtesta/ssh-audit) is a tool for ssh server & client configuration auditing.
```bash
ssh-audit.py $IP
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

# Config files
```bash
# Default configuration
cat /etc/ssh/sshd_config  | grep -v "#" | sed -r '/^\s*$/d'
```

# Dangerous settings
Despite the SSH protocol being one of the most secure protocols available today, some misconfigurations can still make it vulnerable.

| Setting                      | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `PasswordAuthentication yes` | Allows password-based authentication.       |
| `PermitEmptyPasswords yes`   | Allows the use of empty passwords.          |
| `PermitRootLogin yes`        | Allows to log in as the root user.          |
| `Protocol 1`                 | Uses an outdated version of encryption.     |
| `X11Forwarding yes`          | Allows X11 forwarding for GUI applications. |
| `AllowTcpForwarding yes`     | Allows forwarding of TCP ports.             |
| `PermitTunnel`               | Allows tunneling.                           |
| `DebianBanner yes`           | Displays a specific banner when logging in. |
