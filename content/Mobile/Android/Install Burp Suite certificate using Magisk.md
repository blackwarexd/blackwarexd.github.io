---
title: "Install Burp Suite certificate using Magisk"
draft: false
tags:
  - 
---
Burp Suite is an essential tool for both penetration testers and developers. It allows you to intercept and modify HTTP requests. Since most modern mobile applications communicate with servers via APIs, installing the Burp Suite certificate on your device is crucial.

> [!caution] Disclaimer
> A rooted device is required to install the Burp Suite certificate at the system level.
> 
> For this demo, I will be using **AVD**. If your device is not rooted, follow the [[Rooting Android Virtual Device (AVD)]] guide before proceeding.

# Prerequisites
First, download **[MagiskTrustUserCerts](https://github.com/NVISOsecurity/MagiskTrustUserCerts/releases/tag/v0.4.1)**. This Magisk module moves user certificates to the system certificate store.

Next, obtain the **Burp Suite certificate**. Open **Burp Suite**, go to the **Proxy** tab, then **Proxy Settings**. Click **Import / Export CA Certificate**, export it in **DER format**, and save it with a `.crt` extension (e.g., `burp.crt`).

![[export-burp-suite-certificate.png]] ![[save-it-with-crt-extension.png\|500]]

---

# Install Burp Suite Certificate

Now, drag and drop both `burp.crt` and `AlwaysTrustUserCerts.zip` onto your device.

Go to **Settings** on your device and search for **Install a Certificate**. Select **CA Certificate**, and when prompted, click **Install Anyway**.
The certificate will be in the **Downloads** folder. Tap it to install.

![[install-a-certificate-type-ca.png\|300]] ![[install-burp-crt-certificate.png\|300]]

After installation, you’ll notice the certificate is only installed at the **User level**, not the **System level**.

![[burp-suite-is-not-install-in-system-level.png\|300]] ![[burp-suite-is-installed-in-user-level.png\|300]]

To move the certificate to the system, install **AlwaysTrustUserCerts.zip**. Open **Magisk**, go to **Modules**, and click **Install from Storage**.

Locate the `AlwaysTrustUserCerts.zip` file in the **Downloads** folder, tap it, and confirm the installation by clicking **OK**.

![[magisk-install-module-from-storage.png\|300]] ![[confirming-installation-of-magisk-module.png\|300]]

Once installed, click **Reboot** to restart the device.

![[reboot-the-device-after-magisk-module-installation.png\|300]]

After rebooting, open **Magisk** and check the **Modules** section. You should see **Always Trust User Certificates** installed.

Next, go to **Settings > Trusted Credentials** and check that the **Burp Suite certificate** is now listed under **System-level certificates**.

![[verify-the-magisk-module-installation.png\|300]] ![[burp-suite-is-installed-in-system-level.png\|300]]

# Configuring Burp Suite Proxy

To route traffic through Burp Suite, open **AVD settings** and select **Manual proxy configuration**.
Enter the **hostname** and **port number** where Burp Suite is running (e.g., `127.0.0.1:8080`). Click **Apply Settings**.

![[setting-proxy-in-avd-settings.png\|700]]

To verify the setup, open a browser on your device and visit `http://example.com`. If everything is configured correctly, the request will be successfully proxied through **Burp Suite**.

![[proxy-the-request-in-burp-suite.png\|800]]

# References
- [CorSecure - Burp Suite and Frida on an Android Emulator](https://www.youtube.com/watch?v=R3ptGaFW1AU)
