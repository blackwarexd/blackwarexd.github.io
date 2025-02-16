---
title: "Subdomains Enumeration"
draft: false
tags:
  - 
---
# Subdomain Enumeration
`Subdomain enumeration` is the process of finding and listing subdomains by checking DNS records. `A` (or `AAAA` for IPv6) records map subdomains to their IP addresses, while `CNAME` records create aliases that point to other domains or subdomains. 

There are **two** main methods for performing subdomain enumeration:

> [!tip] Active Subdomain Enumeration
> This involves directly interacting with the target domain's DNS servers to uncover subdomains.
> 
> A more common active technique is `brute-force enumeration`, which involves systematically testing a list of potential subdomain names against the target domain.

> [!tip] Passive Subdomain Enumeration
> This method relies on external sources to discover subdomains without directly querying the target's DNS servers.
> 
> One valuable resource is `Certificate Transparency (CT) logs`, which are public repositories of SSL/TLS certificates. 
> Additionally, `search engines` like Google or DuckDuckGo can be used by applying specialized search operators (e.g., `site:`) to filter results and display only subdomains related to the target domain.

# DNSenum
[Dnsenum](https://github.com/fwaeytens/dnsenum) is a multithreaded perl script to enumerate DNS information of a domain and to discover non-contiguous ip blocks.
```bash
dnsenum --enum example.com -f /wordlists/subdomains.txt -r
```

# Gobuster
[Gobuster](https://github.com/OJ/gobuster) is a directory/file, dns and vhost busting tool written in Go.
```bash
# DNS subdomain enumeration mode
gobuster dns -d example.com -w /wordlists/subdomains.txt

# Using pattern to discover additional subdomains,
# Save the pattern into a file - pattern.txt
i-want-this-pattern-{GOBUSTER}-ok

# Execute the gobuster with the given pattern
gobuster dns -r "ns.example.com" -d "example.com" -p pattern.txt -w /wordlists/subdomains.txt
```

# Fierce
[Fierce](https://github.com/mschwager/fierce) is a DNS reconnaissance tool for locating non-contiguous IP space.
```bash
fierce --domain example.com --subdomain-file /wordlists/subdomains.txt
```

# Amass
The OWASP [Amass](https://github.com/owasp-amass/amass) Project performs network mapping of attack surfaces and external asset discovery using open source information gathering and active reconnaissance techniques.
```bash
amass enum -d example.com -brute /wordlists/subdomains.txt
```

# Assetfinder
[Assetfinder](https://github.com/tomnomnom/assetfinder) find domains and subdomains potentially related to a given domain.
```bash
assetfinder -subs-only example.com
```

# PureDNS
[PureDNS](https://github.com/d3mondev/puredns) is a fast domain resolver and subdomain bruteforcing tool that can accurately filter out wildcard subdomains and DNS poisoned entries.
```bash
# It requires massdns installed, and resolvers (https://github.com/trickest/resolvers)
puredns bruteforce /wordlists/subdomains.txt example.com
```

# DNSrecon
[Dnsrecon](https://github.com/darkoperator/dnsrecon) is a python script for DNS enumeration.
```bash
dnsrecon -t brt -d example.com -D /wordlists/subdomains.txt
```

# VirusTotal
To receive information about a domain, type the domain name into the [search bar](https://www.virustotal.com/gui/domain/) and click on the "Relations" tab.

# Certificates
Another interesting source of information we can use to extract subdomains is `SSL/TLS` certificates. To discover additional domain names and subdomains for a target. We can use:

- [Censys.io](https://search.censys.io/certificates)
- [Crt.sh](https://crt.sh/)

```bash
# Query using Crt.sh and save the output
curl -s "https://crt.sh/?q=example.com&output=json" | jq -r '.[] | "\(.name_value)\n\(.common_name)"' | sort -u > output.txt

# OpenSSL
openssl s_client -ign_eof 2>/dev/null <<<$'HEAD / HTTP/1.0\r\n\r' -connect "example.com:443" | openssl x509 -noout -text | grep 'DNS' | sed -e 's|DNS:|\n|g' -e 's|^\*.*||g' | tr -d ',' | sort -u
```

# theHarvester
[theHarvester](https://github.com/laramies/theHarvester) is a simple to use, yet powerful tool designed to be used during the reconnaissance stage of a red team assessment or penetration test.

It performs open source intelligence ([OSINT](https://en.wikipedia.org/wiki/Open-source_intelligence)) gathering to help determine a domain's external threat landscape. The tool gathers names, emails, IPs, subdomains, and URLs by using multiple public resources.

```bash
# Create a "sources.txt" file, fills with modules for theHarvester.
baidu
bufferoverun
crtsh
hackertarget
otx
projectdiscovery
rapiddns
sublist3r
threatcrowd
trello
urlscan
vhost
virustotal
zoomeye

# Execute theHarvester with "sources.txt" file created earlier.
cat sources.txt | while read source; do theHarvester -d "example.com" -b $source -f "${source}-theHarvester"; done

# Extract all subdomains into a single file.
cat *.json | jq -r '.hosts[]' 2>/dev/null | cut -d':' -f1 | sort -u > subdomains-theHarvester.txt
```
