const TITLE_ON = "스레드 자동 번역: 켜짐";
const TITLE_OFF = "스레드 자동 번역: 꺼짐";

async function getEnabled() {
  try {
    const result = await browser.storage.local.get("enabled");
    return result.enabled !== false;
  } catch (e) {
    return true;
  }
}

async function render() {
  const on = await getEnabled();
  try {
    await browser.action.setBadgeText({ text: on ? "" : "OFF" });
    if (!on) {
      await browser.action.setBadgeBackgroundColor({ color: "#888888" });
    }
    await browser.action.setTitle({ title: on ? TITLE_ON : TITLE_OFF });
  } catch (e) {}
}

browser.action.onClicked.addListener(async () => {
  const on = await getEnabled();
  try {
    await browser.storage.local.set({ enabled: !on });
  } catch (e) {}
  render();
});

try {
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.enabled) render();
  });
} catch (e) {}

browser.runtime.onStartup.addListener(render);
browser.runtime.onInstalled.addListener(render);
render();
