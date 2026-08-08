# Thoth 

<img width="48" height="48" alt="thoth-icon-128" src="https://github.com/user-attachments/assets/18006bc7-32af-41dc-89f9-5d9418c0e025" />

A fast scratchpad for drafting emails, LinkedIn messages, and more before you send them. 

Open it, write, close it. Nothing is ever written to disk.

## Why

Drafting directly in Gmail or LinkedIn's message box risks an accidental early send. Thoth is a separate, disposable space to get your wording right first, and copy the final version over when you're happy with it.

## Features

- **Opens instantly** from either the toolbar or a keyboard shortcut (Alt+Shift+D)
- **Never touches disk**. Drafts live in `chrome.storage.session`, an in-memory store the browser guarantees is never persisted
- **Survives an accidental popup refresh**, but clears automatically when the browser process fully exits
- **Copy button** to grab the full draft in one click
- **Clear button** (or `Cmd`/`Ctrl` + `K`) for an instant manual wipe

## Install

This isn't published on the Chrome Web Store — install it as an unpacked extension:

1. Clone or download this repo
2. Go to `chrome://extensions`
3. Toggle **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder
5. Pin the icon to your toolbar

Works the same way in other Chromium browsers (Edge, Brave, etc.) via their equivalent extensions pages.

## Usage

- Click the toolbar icon, or press **Alt+Shift+N**, to open the pad
- Type your draft
- Click **Copy** to grab the text, then paste it into your email or message
- Click **Clear** (or `Cmd`/`Ctrl` + `K`) to wipe it manually at any time

To change the keyboard shortcut, go to `chrome://extensions/shortcuts`.

## Never Saved

Text is held in `chrome.storage.session`, which Chrome keeps in memory only and clears when the browser's underlying process fully terminates. On some systems, Chrome keeps running in the background after you close every window (e.g. macOS unless you `Cmd+Q`, or Windows with "Continue running background apps" enabled). In that case, the draft will still be there next time you open the pop-up, since the process never actually restarted.

## Project structure

```
.
├── manifest.json      # Extension config (Manifest V3)
├── popup.html         # Popup markup
├── popup.css          # Popup styling
├── popup.js           # Draft persistence, copy, and logic
└── icons/             # Toolbar/store icons (16/48/128px)
```
