---
title: "Rooting Android Virtual Device (AVD)"
draft: false
tags:
  - 
---

> [!caution] Disclaimer
> For this demo, I will be using the AVD Pixel 5 API 30 (Android 11).

By default, the AVD does not come pre-rooted, so you need to root it yourself. Thanks to newbit for developing [rootAVD](https://gitlab.com/newbit/rootAVD), a script that makes rooting the emulator easy.

You can verify the emulator’s root status using `Android Debug Bridge` (**ADB**), which comes preinstalled with Android Studio as part of the Android SDK Platform-Tools package.

![[run-su-on-non-rooted-device-got-permission-denied.png]]

> [!tip]
> ADB can be found at `%LOCALAPPDATA%\Android\sdk\platform-tools` on Windows.

Since running `su` results in a `Permission denied` error, this confirms that the emulator is not rooted.

## Rooting the Emulator

To begin the rooting process, you need **rootAVD**. If you haven’t downloaded it yet, clone the repository:

```bash
git clone https://gitlab.com/newbit/rootAVD.git
```

Run the following command to list all available system images:

```powershell
.\rootAVD.bat ListAllAVDs
```

Since I'm on Windows, I’ll run the .bat file.

Next, select and copy the command corresponding to the image file your emulator is currently running (**make sure the AVD is running**). In my case, the command is:

![[list-all-available-images.png]]

> [!note]
> In the highlighted box above, you'll notice that there's the same image (Android 30) but for the Google Play Store API.
>
> **YES!** You can also root an emulator with Google Play Store.

Run the selected command:

```powershell
.\rootAVD.bat system-images\android-30\google_apis\x86\ramdisk.img
```

At some point, you'll be prompted to select a Magisk version for installation.

Press **ENTER** to install the stable version, or wait a moment, as the script will proceed automatically. This isn’t a big deal unless you want a different version.

![[prompt-asking-which-version-of-Magisk-to-install.png]]

Once the patching is complete, the AVD will automatically shut down. If it doesn’t, you may need to shut it down manually (though this is rare).

![[success-and-try-to-shutdown-emulator.png]]

After shutting down, restart the emulator. You should see a new app called **Magisk** installed. Next, open the **Magisk** app. It will prompt you with a message saying, **"Requires Additional Setup."** Click **OK**.

![[prompt-requires-additional-setup.png\|300]]

Then, you’ll be asked to choose a method of installation. Select **"Direct Install"**, and then click the **Reboot** button.

![[method-installation-direct.png\|300]] ![[magisk-reboot-the-device-button.png\|300]]

## Verifying Root Access

To grant root permissions:
1. Open an ADB shell and run:

```bash
adb shell
su
```

![[adb-shell-run-su-command.png]]

2. A **Superuser Request** prompt will appear on the emulator. Click **GRANT**.

![[superuser-request-prompt.png]]

Congratulations! Your emulator is now successfully rooted. 🎉

## References
- [CorSecure - Installing (AND ROOTING) Android Emulator [2024 UPDATE]](https://www.youtube.com/watch?v=QzsNn3GhYYk)
