---
title: "53-DNS"
draft: false
tags:
  - 
---
The `Domain Name System` (**DNS**) is essential for the Internet. It translates domain names, like example.com, into IP addresses used by web servers. DNS resolves computer names to IP addresses and does not have a central database.

`Default Port: 53`

# Different DNS servers

| Server Type                  | Description                                                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DNS Root Server              | Handles top-level domains (TLDs) and links domain names to IP addresses. There are 13 root servers worldwide, managed by [ICANN](https://www.icann.org/). |
| Authoritative Nameserver     | Manages a specific zone and provides definitive answers for its area. If it can't answer, the root server steps in.                                       |
| Non-authoritative Nameserver | Gathers DNS information from other servers but isn't responsible for a specific zone.                                                                     |
| Caching DNS Server           | Stores information from other servers temporarily based on the authoritative server's settings.                                                           |
| Forwarding Server            | Forwards DNS queries to another server.                                                                                                                   |
| Resolver                     | Resolves domain names locally on a computer or router, not an authoritative server.                                                                       |

# DNS records

| DNS Record | Description                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| A          | Provides the IPv4 address for the domain.                                                                                               |
| AAAA       | Provides the IPv6 address for the domain.                                                                                               |
| MX         | Lists the mail servers for the domain.                                                                                                  |
| NS         | Lists the DNS servers (nameservers) for the domain.                                                                                     |
| TXT        | Contains various information, such as validation for Google Search Console, SSL certificates, and SPF/DMARC records for email security. |
| CNAME      | Acts as an alias for another domain. For example, `www.example.com` can point to the same IP as `example.com`.                          |
| PTR        | Performs reverse lookups by converting IP addresses to domain names.                                                                    |
| SOA        | Provides details about the DNS zone and the administrative contact's email address.                                                     |

# WHOIS
[WHOIS](https://www.commandlinux.com/man-page/man1/whois.1.html) is a client for the whois directory service.
```bash
whois example.com
```

Each WHOIS record typically contains the following information:

| Field                    | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `Domain Name`            | The registered domain. (e.g., example.com)                              |
| `Registrar`              | The company where the domain was registered. (e.g., GoDaddy, Namecheap) |
| `Registrant Contact`     | The person or organization that owns the domain.                        |
| `Administrative Contact` | The person responsible for managing the domain.                         |
| `Technical Contact`      | The person handling technical issues for the domain.                    |
| `Creation Date`          | When the domain was registered.                                         |
| `Expiration Date`        | When the domain is set to expire.                                       |
| `Name Servers`           | Servers that translate the domain name into an IP address.              |


# Dig
[Dig](https://linux.die.net/man/1/dig) (**domain information groper**) is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are returned from the name server(s) that were queried.

```bash
# DNS zone / email
dig soa example.com

# Nameserver
dig ns example.com

# DNS server version
dig CH TXT version.bind $IP

# All the records
dig any example.com @$IP

# Zone transfer
dig axfr example.com @$IP

# Bash oneliner subdomain bruteforce
for sub in $(cat /wordlists/subdomains.txt);do dig $sub.example.com @$IP | grep -v ';\|SOA' | sed -r '/^\s*$/d' | grep $sub | tee -a subdomains.txt;done
```

# DNSrecon
[Dnsrecon](https://github.com/darkoperator/dnsrecon) is a python script for DNS enumeration.

```bash
# Enumerate general DNS records for a given domain such as MX,SOA,NS,A, etc
dnsrecon -d example.com
```

# DNSenum
[Dnsenum](https://github.com/fwaeytens/dnsenum) is a perl script that enumerates DNS information.

```bash
# Subdomain bruteforce
dnsenum --dnsserver $IP --enum -p 0 -s 0 -o subdomains.txt -f /wordlists/subdomains.txt example.com
```

# ZoneTransfer
> [!faq] Description
> The zone transfer is how a **secondary DNS server receives information from the primary DNS server and updates it**. There's web based [tool](https://hackertarget.com/zone-transfer/) that can performing the zone transfer automatically or doing it manually using **nslookup**.


```bash
# Identifying nameservers
nslookup -type=NS example.com

# Performing the zone transfer
nslookup -type=any -query=AXFR example.com ns.example.com
```

# Config files

```bash
named.conf.local     # contains local DNS zone config and custom settings
named.conf.options   # includes global options and server-wide settings
named.conf.log       # logging options for BIND to manage and record DNS activity
```

# Dangerous settings

DNS servers can be attacked in various ways. For example, a list of vulnerabilities targeting the BIND9 server can be found at [CVEdetails](https://www.cvedetails.com/product/144/ISC-Bind.html?vendor_id=64), and SecurityTrails [highlights](https://securitytrails.com/blog/most-popular-types-dns-attacks) common DNS server attacks.

Certain settings mentioned below can contribute to these vulnerabilities.

| Option          | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| allow-query     | Specifies which hosts can send requests to the DNS server.            |
| allow-recursion | Specifies which hosts can make recursive requests to the DNS server.  |
| allow-transfer  | Specifies which hosts can receive zone transfers from the DNS server. |
| zone-statistic  | Collects statistics about DNS zones.                                  |
