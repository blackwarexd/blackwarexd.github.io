---
title: "1521-Oracle TNS"
draft: false
tags:
  - 
---
The `Oracle Transparent Network Substrate` (**TNS**) server is a communication protocol that facilitates communication between Oracle databases and applications over networks. TNS supports various networking protocols between Oracle databases and client applications, such as `IPX/SPX` and `TCP/IP` protocol stacks.

`Default Port: 1521`

# Banner grabbing
```bash
nc -nv $IP 1521
```

> [!attention]
> In Oracle, a `System Identifier` (**SID**) is a unique name for a database instance. When a client connects, it uses the SID to specify which instance to connect to. If no SID is given, the default one from the `tnsnames.ora` file is used. The SID helps identify the correct database instance.

# Nmap
[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Default NSE
sudo nmap -sCV -p1521 $IP

# SID Bruteforcing
sudo nmap -p1521 -sV --script=oracle-sid-brute $IP
```

# ODAT
The `Oracle Database Attacking Tool` ([ODAT](https://github.com/quentinhardy/odat)) is an open source penetration testing tool that tests the security of Oracle Databases remotely.
```bash
# Execute all modules
odat all -s $IP

# File upload
odat utlfile -s $IP -d <SID> -U administrator -P password123 --sysdba --putFile C:\\inetpub\\wwwroot test.txt ./test.txt
```

# SQLplus
SQL Plus is the most basic Oracle Database utility, with a basic command-line interface, commonly used by users, administrators, and programmers.

```bash title="sqlplus-install.sh"
wget https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
unzip instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
wget https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
unzip instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
export LD_LIBRARY_PATH=instantclient_21_12:$LD_LIBRARY_PATH
export PATH=$LD_LIBRARY_PATH:$PATH
```

```bash
sqlplus administrator/password123@$IP/<SID>             # Login 
sqlplus administrator/password123@$IP/<SID> as sysdba   # Login (as System Database Admin)

# Once connected, 
# this command can be use to enumerate manually.
    [database]> select * from user_role_privs;          # View roles and privileges for the current user
    [database]> select table_name from all_tables;      # List all tables in the database
    [database]> select name, password from sys.user$;   # Retrieve password hashes from system user table
```

# Config files
The default configuration files vary depending on the version and edition of the installed Oracle software. The configuration files for Oracle TNS are called `tnsnames.ora` and `listener.ora`, and they are typically located in the `$ORACLE_HOME/network/admin` directory. In simple terms, tnsnames.ora contains **client-side** configurations, while listener.ora contains **server-side** configurations.

In Oracle, `PL/SQL` is a programming language used for managing and interacting with databases. Oracle databases can be protected using a `PL/SQL Exclusion List` (**PlsqlExclusionList**). This is a user-created text file placed in the `$ORACLE_HOME/sqldeveloper` directory. It lists the PL/SQL packages or types that should be blocked from execution. Once created, the file can be loaded into the database, acting as a blacklist that prevents access through the Oracle Application Server.






