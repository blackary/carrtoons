const tabs = document.querySelectorAll(".sample-tab");
const panels = document.querySelectorAll(".sample-panel");

const activatePanel = (panelId) => {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.panel === panelId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activatePanel(tab.dataset.panel));
});

const initialTab = document.querySelector(".sample-tab.is-active") || tabs[0];

if (initialTab) {
  activatePanel(initialTab.dataset.panel);
}
