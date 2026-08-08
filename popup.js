/**
 * Thoth popup logic.
 *
 * Storage strategy: chrome.storage.session is an in-memory store that
 * Chrome guarantees is never written to disk and is wiped automatically
 * when the browser process exits. That gives us exactly the behavior
 * requested — text survives an accidental popup refresh, but there is
 * no persistence across a real browser close, and nothing to clean up.
 */

const STORAGE_KEY = "thoth_draft";

const textarea = document.getElementById("note");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const countEl = document.getElementById("count");

let saveTimeout = null;
let copyResetTimeout = null;

function updateCount() {
  countEl.textContent = `${textarea.value.length} chars`;
}

function clearNote({ refocus = true } = {}) {
  textarea.value = "";
  chrome.storage.session.remove(STORAGE_KEY);
  updateCount();
  if (refocus) textarea.focus();
}

function persistNote() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    chrome.storage.session.set({ [STORAGE_KEY]: textarea.value });
  }, 150);
}

function restoreNote() {
  chrome.storage.session.get([STORAGE_KEY], (result) => {
    if (result[STORAGE_KEY]) {
      textarea.value = result[STORAGE_KEY];
    }
    updateCount();
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  });
}

textarea.addEventListener("input", () => {
  updateCount();
  persistNote();
});

async function copyNote() {
  if (!textarea.value) return;

  try {
    await navigator.clipboard.writeText(textarea.value);
  } catch (err) {
    // Fallback for the rare case the async Clipboard API is unavailable.
    textarea.select();
    document.execCommand("copy");
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  copyBtn.textContent = "Copied";
  copyBtn.classList.add("copied");
  clearTimeout(copyResetTimeout);
  copyResetTimeout = setTimeout(() => {
    copyBtn.textContent = "Copy";
    copyBtn.classList.remove("copied");
  }, 1200);
}

clearBtn.addEventListener("click", () => clearNote());
copyBtn.addEventListener("click", copyNote);

// Cmd/Ctrl+K as a fast keyboard wipe, in addition to the Clear button.
textarea.addEventListener("keydown", (event) => {
  const isWipeShortcut =
    (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (isWipeShortcut) {
    event.preventDefault();
    clearNote();
  }
});

restoreNote();
