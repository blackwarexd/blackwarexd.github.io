---
title: "Email recon"
draft: false
tags:
  - 
---
# theHarvester

[theHarvester](https://github.com/laramies/theHarvester) is a simple to use, yet powerful tool designed to be used during the reconnaissance stage of a red team assessment or penetration test.

It performs open source intelligence ([OSINT](https://en.wikipedia.org/wiki/Open-source_intelligence)) gathering to help determine a domain's external threat landscape. The tool gathers names, emails, IPs, subdomains, and URLs by using multiple public resources.

```bash
# Search emails based on example.com domain
theHarvester -d example.com -b google,linkedin
```
