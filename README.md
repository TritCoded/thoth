<div align="center">
  
# Thoth 

<img width="128" height="128" alt="thoth-icon-128" src="https://github.com/user-attachments/assets/18006bc7-32af-41dc-89f9-5d9418c0e025" />

Named after the Egyptian deity of wisdom and writing, Thoth is a browser extension that provides an isolated text box where you can freely draft messages before sending them

</div>

https://github.com/user-attachments/assets/5ce56db7-cb6d-4e77-b88a-7e6b505e802e

---

## Why

Drafting directly in Gmail or LinkedIn's message box risks an accidental early send. Thoth is a separate, disposable space to get your wording right first, and copy the final version over when you're happy with it.

## Features

- **Opens instantly** from the toolbar or a keyboard shortcut (Alt+Shift+D)
- **Never touches disk** - drafts live in `chrome.storage.session`, an in-memory store the browser guarantees is never persisted
- **Survives an accidental popup refresh**, but clears automatically when the browser process fully exits
- **Copy button** to grab the full draft in one click
- **Clear button** (or `Cmd`/`Ctrl` + `K`) for an instant manual wipe
- **Character counter**, including spaces and newlines - handy for staying under LinkedIn's 200–300 character limits
- **Up to 3 drafts** so you can juggle multiple emails or messages at once
- **Light/dark mode** to match your browser's theme

## Install

This isn't published on the Chrome Web Store. Instead, install it as an unpacked extension:

1. Clone or download this repo
2. Go to `chrome://extensions`
3. Toggle **Developer mode** (top right)
4. Click **Load unpacked** and select the `src` folder
5. Pin the icon to your toolbar (optional)

Works the same way in other Chromium browsers (Edge, Brave, etc.) via their equivalent extensions pages.

## Usage

- Click the toolbar icon, or press **Alt+Shift+D**, to open the pad
- Type your draft
- Click **Copy** to grab the text, then paste it into your email or message
- Click **Clear** (or `Cmd`/`Ctrl` + `K`) to wipe it manually at any time

To change the keyboard shortcut, go to `chrome://extensions/shortcuts`.

## Never Saved

Text is held in `chrome.storage.session`, which Chrome keeps in memory only and clears when the browser's underlying process fully terminates. On some systems, Chrome keeps running in the background after you close every window (e.g. macOS unless you `Cmd+Q`, or Windows with "Continue running background apps" enabled). In that case, the draft will still be there next time you open the pop-up, since the process never actually restarted.

## Found a bug, or want to request a feature?

Open an issue! There are templates for both:

- [🐛 Report a bug](https://github.com/TritCoded/thoth/issues/new?template=bug_report.yml)
- [💡 Request a feature](https://github.com/TritCoded/thoth/issues/new?template=feature_request.yml)

## Receive Updates

Interested in using Thoth, but don't want to miss an update for a bug fix?

Click `Watch` at the top of the page and select **All Activity** to receive updates about new commits!
