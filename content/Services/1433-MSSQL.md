---
title: "1433-MSSQL"
draft: false
tags:
  - 
---
The `Microsoft SQL` (**MSSQL**) is a proprietary `Relational Database Management System` (**RDBMS**) developed by Microsoft. It is popular among database administrators and developers when building applications that run on Microsoft's .NET framework due to its strong native support for .NET.

`Default Port: 1433`

# Banner grabbing
```bash
nc -nv $IP 1433
```

# MSSQL Databases
MSSQL has default system databases. Here are the default databases and a brief description of each:

| Default System Database | Description                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `master`                | Holds important system info for the SQL Server instance.                                     |
| `model`                 | A template for new databases. Changes here affect new databases created after modifications. |
| `msdb`                  | Used by SQL Server Agent to manage jobs and alerts.                                          |
| `tempdb`                | Stores temporary data and objects during database operations.                                |
| `resource`              | A read-only database with essential system objects for SQL Server.                           |

# Nmap
[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Default NSE
sudo nmap -sCV -p1433 $IP

# Enum version/info mssql
sudo nmap -p1433 --script=ms-sql-info $IP

# Enum target/domain/netbios name
sudo nmap -p1433 --script=ms-sql-ntlm-info --script-args mssql.instance-port=1433 $IP

# Enum mssql for empty password
sudo nmap -p1433 --script=ms-sql-empty-password $IP

# Bruteforcing user/password
sudo nmap -p1433 --script=ms-sql-brute --script-args userdb=/wordlists/user.txt,passdb=/wordlists/password.txt $IP

# Query the login users with AUTHENTICATION
sudo nmap -p1433 --script=ms-sql-query --script-args mssql.username=administrator,mssql.password=password123,ms-sql-query.query="SELECT * FROM master..syslogins" -oN output.txt $IP

# Query the sysusers with AUTHENTICATION
sudo nmap -p1433 --script=ms-sql-query --script-args mssql.username=administrator,mssql.password=password123,ms-sql-query.query="SELECT * FROM master..sysusers" -oN output.txt $IP

# Dump hashes with AUTHENTICATION
sudo nmap -p1433 --script=ms-sql-dump-hashes --script-args mssql.username=administrator,mssql.password=password123 $IP

# Execute command with AUTHENTICATION
sudo nmap -p1433 --script=ms-sql-xp-cmdshell --script-args mssql.username=administrator,mssql.password=password123,ms-sql-xp-cmdshell.cmd="ipconfig" $IP

# MSSQL allscripts
sudo nmap -sV -p1433 --script=ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args=mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER $IP
```

# NetExec
[NetExec](https://github.com/Pennyw0rth/NetExec) (AKA **nxc**) is a network service exploitation tool that helps automate assessing the security of large networks.

```bash
# Get Windows version
nxc mssql $IP

# Password spraying
nxc mssql $IP -u /wordlists.txt/users.txt -p /wordlists/passwords.txt --no-bruteforce

# Enumerate and exploit MSSQL privileges
nxc mssql $IP -u 'administrator' -p 'password123' -M mssql_priv
```

# MSSQLclient
```bash
impacket-mssqlclient administrator@$IP -windows-auth                # Login (prompt password)
impacket-mssqlclient administrator:password123@$IP -windows-auth    # Login (specify password on CLI)
impacket-mssqlclient domain.local/administrator:password123@$IP -dc-ip $IP -windows-auth    # Login (domain)

# Once connected, 
# this command can be use to enumerate manually.
    [database]> enable_xp_cmdshell      # Enable for execute command
    [database]> xp_cmdshell <command>   # Execute command
    [database]> xp_dirtree <path>       # Enable path traversal
```

# Metasploit Framework
[Metasploit Framework](https://github.com/rapid7/metasploit-framework) is an open source platform that supports vulnerability research, exploit development, and the creation of custom security tools.

```bash
auxiliary/scanner/mssql/mssql_login                 # Queries the instance for a specific user/pass
auxiliary/admin/mssql/mssql_enum                    # Enum MSSQL
auxiliary/admin/mssql/mssql_enum_sql_logins         # Enum MSSQL login
auxiliary/admin/mssql/mssql_exec                    # Execute Windows command via the `xp_cmdshell`(default) or  the `sp_oacreate` procedure
auxiliary/admin/mssql/mssql_enum_domain_accounts    # Brute-force RIDs
```

# Dangerous settings
Some settings can be dangerous for the company and its infrastructure. This is not an extensive list because there are countless ways MSSQL databases can be configured.

- `No encryption for MSSQL clients`: Clients connecting without encryption can expose sensitive data.
- `Self-signed certificates`: These can be spoofed, making connections insecure.
- [Named pipes](https://learn.microsoft.com/en-us/sql/tools/configuration-manager/named-pipes-properties?view=sql-server-ver15): A potentially insecure way for clients to connect to the server.
- `Weak/default SA credentials`: If the sa (system admin) account isn't secured or disabled, it can be easily exploited.