---
title: "Install Burp Suite certificate using ADB"
draft: false
tags:
  - 
---
Burp Suite is an essential tool for both penetration testers and developers. It allows you to intercept and modify HTTP requests. Since most modern mobile applications communicate with servers via APIs, installing the Burp Suite certificate on your device is crucial.

> [!caution] Disclaimer
> For this demo, I will be using **Genymotion**.  
> By default, Genymotion comes with root access on certain Android versions. Check [this](https://docs.genymotion.com/desktop/Using_root_access/) for more details.

# Prerequisites
First, obtain the **Burp Suite certificate**. Open **Burp Suite**, go to the **Proxy** tab, then **Proxy Settings**. Click **Import / Export CA Certificate**, export it in **DER format**, and save it with a `.crt` extension (e.g., `burp.crt`).

![[export-burp-suite-certificate.png]] ![[save-it-with-crt-extension.png\|500]]

---

# Install Burp Suite Certificate
Next, you need to convert the **Burp Suite certificate** into **PEM format**.

Run the following command:
```bash
openssl x509 -inform DER -in burp.crt -out burp.pem
```

![[convert-burp-suite-certificate-into-PEM.png]]

Then, rename the certificate file using its hash value. Make sure to append `.0` as the extension:

```bash
openssl x509 -inform PEM -subject_hash_old -in burp.pem | head -1
mv burp.pem <hash>.0
```

![[rename-burp-suite-cert-to-hash.png]]

> [!tip]
> If you encounter **"Read-Only"** errors on the file system, run `adb remount` first, then `adb shell`.

Now, push the renamed file into the device. First, remount the partitions with read-write access:

```powershell
adb remount
adb push <hash.0> /system/etc/security/cacerts/
```

![[remount-the-file-system-and-push-the-file.png]]

Set the correct file permissions (`644`) and reboot the device:

```powershell
adb shell chmod 664 /system/etc/security/cacerts/<hash.0>
```

![[set-the-permission-on-pushed-file.png]]

After rebooting, go to **Settings > Trusted Credentials** and check that the **Burp Suite certificate** is now listed under **System-level certificates**.

At the top of the emulator screen, you'll see the device's IP address. You need this IP for configuring the Burp Suite proxy. In my case, it is `192.168.56.107`.

![[verify-the-installed-burp-certificate.png|300]]

# Configuring Burp Suite Proxy
First, open **Burp Suite**, navigate to the **Proxy** tab, and go to **Proxy Settings**. Click **Add**, select the **IP address** used by Genymotion, and set a **port number** (e.g., `192.168.56.1:8081`).

![[add-a-new-listener-on-burp-suite.png|600]]

Next, open **WiFi settings** in Emulator, click the **settings icon**, then tap the **pencil icon** to edit the connection.

Select **Proxy: Manual**, enter the **proxy listener details**, and click **Save**.

![[open-wifi-settings-in-emulator.png|300]]![[add-the-proxy-on-the-emulator.png|300]]

To verify the setup, open a browser on your device and visit `https://example.com`. If everything is configured correctly, the request should be successfully proxied through **Burp Suite**.

![[proxy-the-request-in-burp-suite-genymotion.png]]

# References
- [Gaurav Srivastava - How to install Burp Suite certificate in an Android emulator](https://medium.com/@gauravsiv1994/how-to-install-burp-suite-certificate-in-an-android-emulator-ec5baf9c8f6f)
