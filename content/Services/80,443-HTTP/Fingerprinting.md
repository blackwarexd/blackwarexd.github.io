---
title: "Fingerprinting"
draft: false
tags:
  - 
---
Fingerprinting identifies the technologies behind a website or web app, like servers, operating systems, and software. Just as a fingerprint is unique to a person, these digital signatures reveal details about a system’s infrastructure and weaknesses.

# Banner grabbing
```bash
curl -I example.com
```

# Nmap
[Nmap](https://nmap.org/) is a network scanner created by [Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon). Nmap is used to discover hosts and services on computer network by sending packets and analyzing the responses.

Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection.

```bash
# Default NSE
sudo nmap -sCV -p80,443 $IP

# Enum HTTP
sudo nmap -p80 --script=http-enum $IP

# Enum headers in index page
sudo nmap -p80 --script=http-headers $IP

# Enum HTTP banner
sudo nmap -p80 --script=banner $IP

# Enum HTTP methods
sudo nmap -p80 --script=http-methods $IP
```

# Whatweb
[WhatWeb](https://github.com/urbanadventurer/WhatWeb) recognises web technologies including content management systems (CMS), blogging platforms, statistic/analytics packages, JavaScript libraries, web servers, and embedded devices.
```bash
whatweb -a 1 http://example.com   # Aggression (stealthy)
whatweb -a 3 http://example.com   # Aggression (aggresive)
```

# Nikto
[Nikto](https://github.com/sullo/nikto) is a powerful open-source web server scanner. 
```bash
nikto -h example.com -Tuning b
```

# Browser Extensions
|Tool|Description|Features|
|---|---|---|
|[Wappalyzer](https://www.wappalyzer.com/)|Browser extension and online service for website technology profiling.|Identifies a wide range of web technologies, including CMSs, frameworks, analytics tools, and more.|
|[BuiltWith](https://builtwith.com/toolbar)|Web technology profiler that provides detailed reports on a website's technology stack.|Offers both free and paid plans with varying levels of detail.|

# Metasploit Framework
[Metasploit Framework](https://github.com/rapid7/metasploit-framework) is an open source platform that supports vulnerability research, exploit development, and the creation of custom security tools.

```bash
auxiliary/scanner/http/http_version            # Enum http version
auxiliary/scanner/http/http_header             # Enum http header
auxiliary/scanner/http/robots_txt              # Enum robots.txt
auxiliary/scanner/http/brute_dirs              # Brute-forcing directories
auxiliary/scanner/http/dir_scanner             # Brute-forcing directories
auxiliary/scanner/http/files_dir               # Brute-forcing files
auxiliary/scanner/http/apache_userdir_enum     # Enum Apache user
auxiliary/scanner/http/http_login              # Brute-forcing login
exploit/windows/http/rejetto_hfs_exec          # Rejetto HFS2.3b (RCE)
exploit/multi/http/tomcat_jsp_upload_bypass    # Upload JSP shell
```

