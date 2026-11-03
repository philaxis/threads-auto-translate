const api = globalThis.browser ?? globalThis.chrome;

const TITLE_ON = api.i18n.getMessage("titleOn");
const TITLE_OFF = api.i18n.getMessage("titleOff");

async function getEnabled() {
  try {
    const result = await api.storage.local.get("enabled");
    return result.enabled !== false;
  } catch (e) {
    return true;
  }
}

async function render() {
  const on = await getEnabled();
  try {
    await api.action.setBadgeText({ text: on ? "" : "OFF" });
    if (!on) {
      await api.action.setBadgeBackgroundColor({ color: "#888888" });
    }
    await api.action.setTitle({ title: on ? TITLE_ON : TITLE_OFF });
  } catch (e) {}
}

api.action.onClicked.addListener(async () => {
  const on = await getEnabled();
  try {
    await api.storage.local.set({ enabled: !on });
  } catch (e) {}
  render();
});

try {
  api.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.enabled) render();
  });
} catch (e) {}

api.runtime.onStartup.addListener(render);
api.runtime.onInstalled.addListener(render);
render();
