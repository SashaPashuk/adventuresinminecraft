import { renderListingHTML } from "./utils/helpers.js";

const mods = ["journeymap-mod", "minecraft-pe-1-12-2"];

document.addEventListener("DOMContentLoaded", async () => {
  renderListingHTML(mods);
});
