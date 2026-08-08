const DRAFT_PREFIX = "thoth_draft_";
const SETTINGS_KEY = "thoth_settings";
const TAB_COUNT = 3;

const textarea = document.getElementById("note");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const countEl = document.getElementById("count");
const tabButtons = document.querySelectorAll(".tab");

let activeTab = 1;
let saveTimeout = null;
let copyResetTimeout = null;

function draftKey(tab) {
  return `${DRAFT_PREFIX}${tab}`;
}

function updateCount() {
  countEl.textContent = `${textarea.value.length} chars`;
}

function clearNote({ refocus = true } = {}) {
  textarea.value = "";
  chrome.storage.session.remove(draftKey(activeTab));
  updateCount();
  if (refocus) textarea.focus();
}

function persistNote() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    chrome.storage.session.set({ [draftKey(activeTab)]: textarea.value });
  }, 150);
}

function loadTab(tab) {
  chrome.storage.session.get([draftKey(tab)], (result) => {
    textarea.value = result[draftKey(tab)] || "";
    updateCount();
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  });
}

function switchTab(tab) {
  if (tab === activeTab) return;
  clearTimeout(saveTimeout);
  chrome.storage.session.set({ [draftKey(activeTab)]: textarea.value });

  activeTab = tab;
  tabButtons.forEach((btn) => {
    const isActive = Number(btn.dataset.tab) === tab;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive);
  });
  loadTab(tab);
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

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => switchTab(Number(btn.dataset.tab)));
});

textarea.addEventListener("keydown", (event) => {
  const isWipeShortcut =
    (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (isWipeShortcut) {
    event.preventDefault();
    clearNote();
  }

  const isTabSwitch =
    (event.metaKey || event.ctrlKey) && /^[1-3]$/.test(event.key);
  if (isTabSwitch) {
    event.preventDefault();
    switchTab(Number(event.key));
  }
});

// ---------- settings ----------

const defaultSettings = { theme: "dark", font: "sans", size: "roomy" };

function applySettings(settings) {
  document.documentElement.setAttribute("data-theme", settings.theme);
  document.documentElement.setAttribute("data-font", settings.font);
  document.documentElement.setAttribute("data-size", settings.size);

  document.querySelectorAll(".segmented").forEach((group) => {
    const key = group.dataset.setting;
    group.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.value === settings[key]);
    });
  });
}

function saveSettings(settings) {
  chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

function loadSettings(callback) {
  chrome.storage.local.get([SETTINGS_KEY], (result) => {
    callback({ ...defaultSettings, ...result[SETTINGS_KEY] });
  });
}

let currentSettings = { ...defaultSettings };

settingsBtn.addEventListener("click", () => {
  const isHidden = settingsPanel.classList.toggle("hidden");
  settingsBtn.classList.toggle("active", !isHidden);
  if (isHidden) textarea.focus();
});

document.querySelectorAll(".segmented").forEach((group) => {
  group.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-value]");
    if (!btn) return;
    const key = group.dataset.setting;
    currentSettings = { ...currentSettings, [key]: btn.dataset.value };
    applySettings(currentSettings);
    saveSettings(currentSettings);
  });
});

loadSettings((settings) => {
  currentSettings = settings;
  applySettings(settings);
});

loadTab(activeTab);
