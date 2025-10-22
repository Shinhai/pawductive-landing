// ===== 1) Configure your release asset URLs here (Windows is real; mac is placeholder) =====
const URLS = {
  windows: "https://github.com/Shinhai/Pawductive-Updates/releases/download/v1.0.9/Pawductive-Setup-1.0.9.exe",
  macos:   "https://github.com/Shinhai/Pawductive-Updates/releases/download/v1.0.9/Pawductive-1.0.9-universal.dmg" // TODO: replace when you publish mac
};

// ===== 2) Wire up fallbacks and button handlers =====
const fallbackWin = document.getElementById("fallback-win");
const fallbackMac = document.getElementById("fallback-mac");
fallbackWin.href = URLS.windows;
fallbackMac.href = URLS.macos;

document.getElementById("download-windows").addEventListener("click", () => {
  triggerDownload(URLS.windows);
});

document.getElementById("download-macos").addEventListener("click", () => {
  triggerDownload(URLS.macos);
});

// ===== 3) Hidden-iframe download to keep user on the page & avoid CORS issues =====
function triggerDownload(url) {
  if (!url || url.includes("vX.Y.Z")) {
    alert("macOS build coming soon.");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);

  // Clean up in case the request hangs
  setTimeout(() => {
    try { iframe.remove(); } catch {}
  }, 60_000);
}

// ===== 4) Small polish (year stamp) =====
document.getElementById("year").textContent = new Date().getFullYear();