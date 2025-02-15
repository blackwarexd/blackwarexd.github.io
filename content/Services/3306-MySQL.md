---
title: "3306-MySQL"
draft: false
tags:
  - 
---
The **MySQL** is an open-source SQL `Relational Database Management System` (**RDBMS**) developed and supported by Oracle. A database is simply a structured collection of data organized for easy use and retrieval. It works according to the `client-server principle` and consists of a MySQL server and one or more MySQL clients.

`Default Port: 3306`

# Banner grabbing
```bash
nc -nv $IP 3306
```

# Nmap
[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.


```bash
# Default NSE
sudo nmap -sCV -p3306 $IP

# Enum with all NSE script 
sudo nmap -sV -p3306 --script=mysql* $IP

# Enum version/info/capabilities/attribute of MySQL
sudo nmap -p3306 --script=mysql-info $IP

# Enum empty password/anonymous login
sudo nmap -p3306 --script=mysql-empty-password $IP

# Enum MySQL audit with AUTHENTICATION
sudo nmap -p3306 --script=mysql-audit --script-args "mysql-audit.username='administrator',mysql-audit.password='password123',mysql-audit.filename='/usr/share/nmap/nselib/data/mysql-cis.audit'" $IP

# Enum users with AUTHENTICATION
sudo nmap -p3306 --script=mysql-users --script-args "mysqluser='administrator',mysqlpass='password123'" $IP

# Enum databases with AUTHENTICATION
sudo nmap -p3306 --script=mysql-databases --script-args "mysqluser='administrator',mysqlpass='password123'" $IP

# Enum all variables with AUTHENTICATION
sudo nmap -p3306 --script=mysql-variables --script-args "mysqluser='administrator',mysqlpass='password123'" $IP

# Dump hashes with AUTHENTICATION
sudo nmap -p3306 --script=mysql-dump-hashes --script-args "username='administrator',password='password123'" $IP

# Query database with AUTHENTICATION
sudo nmap -p3306 --script=mysql-query --script-args "query='select count(*) from books.authors;',username='administrator',password='password123'" $IP
```

# MySQL connect
```bash
mysql -u administrator -h $IP                   # Login (prompt password)
mysql -u administrator -pPassword123 -h $IP     # Login (specify password on CLI)

# Once connected, 
# this command can be use to enumerate manually.
    [none]> show databases;
    [none]> use <database>;
    [database]> show tables;
    [database]> show columns from <table>;
    [database]> select * from <table>;
    [database]> select * from <table> where <column> = "<string>";
    [database]> select load_file("/etc/passwd");
```

# Hydra
[Hydra](https://github.com/vanhauser-thc/thc-hydra) is a `parallelized` login cracker which `supports numerous protocols` to attack. It is very fast and flexible, and new modules are easy to add.

```bash
hydra -L /wordlists.txt/users.txt -P /wordlists/passwords.txt $IP mysql
```

# Metasploit Framework
[Metasploit Framework](https://github.com/rapid7/metasploit-framework) is an open source platform that supports vulnerability research, exploit development, and the creation of custom security tools.

```bash
auxiliary/scanner/mysql/mysql_version           # Enum MySQL version
auxiliary/scanner/mysql/mysql_schemadump        # Dump schema information from MySQL
auxiliary/scanner/mysql/mysql_writable_dirs     # Enum writeable directories using the MySQL `SELECT INTO DUMPFILE` feature
auxiliary/scanner/mysql/mysql_file_enum         # Enum files and directories using the MySQL `load_file` feature
auxiliary/scanner/mysql/mysql_hashdump          # Dump the credentials
auxiliary/scanner/mysql/mysql_login             # Queries the instance for a specific user/pass
auxiliary/admin/mysql/mysql_enum                # Enum MySQL with valid credentials
auxiliary/admin/mysql/mysql_sql                 # Execute SQL statement with valid credentials
```

# Config files
```bash
# Default configuration
cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep -v "#" | sed -r '/^\s*$/d'
```

# Dangerous settings
Some settings can be dangerous for the company and its infrastructure.

| Settings           | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `user`             | Defines the user under which the MySQL service runs.                                    |
| `password`         | Sets the password for the MySQL user.                                                   |
| `admin_address`    | Specifies the IP address for administrative network connections.                        |
| `debug`            | Controls the level of debugging information provided.                                   |
| `sql_warnings`     | Controls whether warnings are displayed for single-row INSERT statements.               |
| `secure_file_priv` | Limits the directories from which files can be loaded or to which they can be exported. |