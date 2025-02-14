---
title: "21-FTP"
draft: false
tags:
  - 
---
The `File Transfer Protocol` (**FTP**) is a standard communication protocol used for transferring computer files between a server and a client on a network. It operates as a `clear-text` protocol, meaning that data is sent in an unencrypted format.

`Default Port: 21`

# Banner grabbing

```bash
nc -nv $IP 21

# Get certificate if any
openssl s_client -connect $IP:21 -starttls ftp
```

# Nmap

[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Enum FTP with all NSE
nmap -p21 --script=ftp-* $IP

# Perform brute-force
nmap -p21 --script=ftp-brute --script-args userdb=/wordlists/users.txt $IP
```

# FTP command

[FTP](https://linux.die.net/man/1/ftp) is the user interface to the Internet standard `File Transfer Protocol`. The program allows a user to transfer files to and from a remote network site.

```bash
ftp $IP
>anonymous        # Username
>anonymous        # Password
> status          # Show current status
> ls -a           # List hidden files
> ls -R           # Recursively listing files
> get file.txt    # Download a file (file.txt)
> put file.txt    # Upload a file (file.txt)
> exit            # Exit 
```

# Download all files (recursively)

```bash
wget -m ftp://'anonymous:anonymous'@$IP
wget -m --no-passive ftp://'anonymous:anonymous'@$IP
```

# Hydra

[Hydra](https://github.com/vanhauser-thc/thc-hydra) is a `parallelized` login cracker which `supports numerous protocols` to attack. It is very fast and flexible, and new modules are easy to add.

```bash
hydra -L /wordlists.txt/users.txt -P /wordlists/passwords.txt $IP ftp
```

# Metasploit Framework

[Metasploit Framework](https://github.com/rapid7/metasploit-framework) is an open source platform that supports vulnerability research, exploit development, and the creation of custom security tools.

```bash
auxiliary/scanner/ftp/ftp_version          # ftp version enumeration
auxiliary/scanner/ftp/anonymous            # check for anonymous login
auxiliary/scanner/ftp/ftp_login            # ftp brute-force
exploit/unix/ftp/vsftpd_234_backdoor       # vsftpd v2.3.4 (exploit)
```

# Config files

```bash
# vsFTPd config file
cat /etc/vsftpd.conf | grep -v "#"

# List users can't access to FTP
cat /etc/ftpusers
```

# Dangerous settings

Different security settings can be applied to an `FTP` server. One such authentication method is `anonymous` access. For vsFTPd, the [optional settings](http://vsftpd.beasts.org/vsftpd_conf.html) that can be added to the configuration file for the anonymous login look like this:

| Setting                      | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| anonymous_enable=YES         | Allowing anonymous login?                                                          |
| anon_upload_enable=YES       | Allowing anonymous to upload files?                                                |
| anon_mkdir_write_enable=YES  | Allowing anonymous to create new directories?                                      |
| no_anon_password=YES         | Do not ask anonymous for password?                                                 |
| anon_root=/home/username/ftp | Directory for anonymous.                                                           |
| write_enable=YES             | Allow the usage of FTP commands: STOR, DELE, RNFR, RNTO, MKD, RMD, APPE, and SITE? |
| hide_ids=NO                  | User and group IDs are visible, instead of displayed as "ftp".                     |
