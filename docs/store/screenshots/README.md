# Screenshot Capture

This folder is intentionally empty in the repo. Capture screenshots from
real devices or simulators and drop them here before running `eas submit`.

## iOS

1. Boot iPhone 15 Pro Max simulator (6.7") and iPhone 8 Plus simulator (5.5"). Optionally an iPad simulator if iPad support is enabled in `app.json`.
2. Set `currency = USD` and `theme = Light` via the Settings tab to keep visuals consistent across captures.
3. Use **Cmd+S** in Simulator to save a PNG to Desktop, then move into this folder named `ios-67-01-dashboard.png`, `ios-67-02-transactions.png`, etc.
4. Repeat in Dark mode for the screens that look meaningfully different (Dashboard, Analytics) and append `-dark` to the filename.

## Android

1. Boot a Pixel 7 Pro (1080 × 2400) and a Pixel C tablet (2560 × 1800) emulator.
2. Use `adb exec-out screencap -p > shot.png` to capture, or the camera button in the emulator toolbar.
3. Filename pattern: `android-phone-01-dashboard.png`, `android-tablet-01-dashboard.png`.

## Seeding the screens with realistic data

The hidden profiler screen (long-press the Version row in Settings → About)
can seed two years of synthetic data so every screen looks populated. Use
**Reset** before each capture run to keep the data identical across the
six platform variants.
