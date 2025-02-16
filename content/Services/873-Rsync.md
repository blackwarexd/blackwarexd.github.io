---
title: "873-Rsync"
draft: false
tags:
  - 
---
The `Remote Sync` (**Rsync**) is a utility for transferring and synchronizing files between a computer and a storage drive and across networked computers by comparing the modification times and sizes of files.

`Default Port: 873`

# Banner grabbing
```bash
nc -nv $IP 873
```

# Nmap
[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Default NSE
sudo nmap -sCV -p873 $IP
```

# Manual enumeration
This [guide](https://book.hacktricks.wiki/en/network-services-pentesting/873-pentesting-rsync.html#873---pentesting-rsync) covers some of the ways Rsync can be abused.
```bash
nc -vn 127.0.0.1 873
(UNKNOWN) [127.0.0.1] 873 (rsync) open
@RSYNCD: 31.0        <--- You receive this banner with the version from the server
@RSYNCD: 31.0        <--- Then you send the same info
#list                <--- Then you ask the sever to list
raidroot             <--- The server starts enumerating
USBCopy
NAS_Public
_NAS_Recycle_TOSRAID	<--- Enumeration finished
@RSYNCD: EXIT         <--- Sever closes the connection


#Now lets try to enumerate "raidroot"
nc -vn 127.0.0.1 873
(UNKNOWN) [127.0.0.1] 873 (rsync) open
@RSYNCD: 31.0
@RSYNCD: 31.0
raidroot
@RSYNCD: AUTHREQD 7H6CqsHCPG06kRiFkKwD8g    <--- This means you need the password
```

# Rsync
[Rsync](https://linux.die.net/man/1/rsync) is a fast and extraordinarily versatile file copying tool. This [guide](https://phoenixnap.com/kb/how-to-rsync-over-ssh) is helpful for understanding the syntax for using Rsync over SSH.
```bash
# List contents of the share
rsync -av --list-only rsync://$IP/<share>

# Copying files from a shared folder
rsync -av rsync://$IP/<share> ./rsyn_shared
```