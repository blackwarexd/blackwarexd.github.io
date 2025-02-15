---
title: "Pulling an APK file using ADB"
draft: false
tags:
  - 
---

First, we will need to get the package name of the desired application. For example: `com.example.app`

Command Below:

```bash
adb shell pm list packages | grep -i app
```

![[example using grep command.png]]


> [!note]
> In some cases, the package name may be different from the app name.
> If you can't find the package name, search for the app on Google Play in a browser.
> The package name will be in the URL.

![[package name via browser.png]]


Second, we will be allocated the path of the selected APK file.

> [!note]
> The output will look something like one of the following:
> - package:/data/app/com.example.app-2.apk
> - package:/data/app/com.example.app-nfFSVxn_CTafgra3Fr_rXQ==/base.apk


```bash
adb shell pm path com.example.app
```

![[getting the full path name.png]]


Using the full path name, pull the APK file from the Android device to the machine.

```bash
adb pull /data/app/com.example.sapp-2.apk path/to/desired/destination
```

![[pull the APK file.png]]

# References
- [Ali Aldarwish - Pulling an apk file using adb](https://alifredo.medium.com/pulling-an-apk-file-using-adb-7d3716599341)
