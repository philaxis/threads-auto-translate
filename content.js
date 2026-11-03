const LABELS = new Set(["번역하기", "번역 보기", "Translate", "See translation"]);

const seenButtons = new WeakSet();
const seenPosts = new WeakSet();

let enabled = true;
const queue = [];
let draining = false;

function readEnabled() {
  try {
    return browser.storage.local
      .get("enabled")
      .then((result) => {
        if (result && typeof result.enabled === "boolean") enabled = result.enabled;
      })
      .catch(() => {});
  } catch (e) {
    enabled = true;
    return Promise.resolve();
  }
}

const clickObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      clickObserver.unobserve(entry.target);
      queue.push(entry.target);
    }
    drain();
  },
  { rootMargin: "800px 0px" }
);

function drain() {
  if (draining) return;
  draining = true;
  const step = () => {
    const el = queue.shift();
    if (!el) {
      draining = false;
      return;
    }
    if (enabled && el.isConnected && LABELS.has(el.textContent.trim())) {
      try {
        el.click();
      } catch (e) {}
    }
    setTimeout(step, 150);
  };
  step();
}

function scan() {
  if (!enabled) return;
  for (const el of document.querySelectorAll('div[role="button"]')) {
    if (!LABELS.has(el.textContent.trim())) continue;
    if (seenButtons.has(el)) continue;
    const post = el.closest("[data-pressable-container]");
    if (post && seenPosts.has(post)) continue;
    seenButtons.add(el);
    if (post) seenPosts.add(post);
    clickObserver.observe(el);
  }
}

let scanTimer = 0;
function scheduleScan() {
  clearTimeout(scanTimer);
  scanTimer = setTimeout(scan, 250);
}

try {
  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes.enabled) return;
    enabled = changes.enabled.newValue !== false;
    if (enabled) scan();
  });
} catch (e) {}

readEnabled().then(scan);
new MutationObserver(scheduleScan).observe(document.body, {
  childList: true,
  subtree: true,
});
