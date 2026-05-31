# SpentIt — Privacy Policy

_Last updated: 30 May 2026_

SpentIt is a 100% offline personal-finance tracker. **It collects no data.**

## What we collect

Nothing.

## What we send to our servers

Nothing — SpentIt has no servers. The app does not initiate any network
connection at runtime. Both iOS and Android builds ship with the
`INTERNET` permission disabled.

## What we store on your device

Your financial data (accounts, transactions, categories, budgets, settings)
is stored in an SQLite database located inside the app's private sandbox.
The database is encrypted with an AES-256 key generated on first launch
and held in the platform secure keystore (iOS Keychain / Android Keystore).
The key never leaves your device.

## What we share with third parties

Nothing. There are no analytics SDKs, no crash reporters that phone home,
no advertising identifiers, and no telemetry of any kind.

## Backups and exports

When you explicitly tap "Create encrypted backup", the app produces a file
inside the OS share sheet. **You** choose where that file goes (iCloud
Drive, Google Drive, Files, email, AirDrop, etc.). SpentIt does not upload
the file anywhere on your behalf.

Encrypted backups (`.spentit`) are protected with a passphrase you choose,
hashed via PBKDF2-HMAC-SHA256 (150,000 iterations), and encrypted with
AES-256-GCM. Plain JSON and CSV exports are unencrypted by design — use
them only if you accept the trade-off.

## Children's privacy

SpentIt is not directed to children under 13. Since the app collects no
data, no personal information about children — or anyone else — is ever
gathered.

## Changes to this policy

If we ever change this policy we will update the "Last updated" date
above. Because the app has no telephone-home channel, we cannot notify
existing users — please check this page periodically if you care about
updates.

## Contact

For questions email the maintainer at the address listed on the app's
store page.
