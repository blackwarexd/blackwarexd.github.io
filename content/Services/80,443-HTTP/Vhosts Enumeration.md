---
title: "Vhosts Enumeration"
draft: false
tags:
  - 
---
# Vhosts vs Subdomains
At the core of `virtual hosting` is the ability of web servers to distinguish between multiple websites or applications sharing the same IP address. This is achieved by leveraging the `HTTP Host` header, a piece of information included in every `HTTP` request sent by a web browser.

> [!info]
> `Subdomains`: are extensions of a main domain (e.g., `blog.example.com` for example.com).
> They have their own `DNS records` and can point to the same or different IP addresses.
> 
> `Virtual Hosts` (**Vhosts**): are web server configurations that allow multiple websites or applications to run on a single server. They can be linked to main domains (e.g., example.com) or subdomains (e.g., `dev.example.com`).

# Gobuster
[Gobuster](https://github.com/OJ/gobuster) is a directory/file, dns and vhost busting tool written in Go.
```bash
gobuster vhost -u http://example.com -w /wordlists/subdomains.txt
```

# Ffuf
[Ffuf](https://github.com/ffuf/ffuf) is a fast web fuzzer written in Go.
```bash
ffuf -u http://example.com -H "Host: FUZZ.example.com" -w /wordlists/subdomains.txt
```

# Curl
```bash
# Sending curl request with the host header
curl -s http://example.com -H "Host: vhost.example.com"

# Fuzzing using curl
cat vhosts.txt | while read vhost;do echo "\n********\nFUZZING: ${vhost}\n********"; curl -s -I http://example.com -H "HOST: ${vhost}.example.com" | grep "Content-Length: "; done
```