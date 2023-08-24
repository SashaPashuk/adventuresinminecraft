import { renderListingHTML } from "./utils/helpers.js";
import { getActiveLocale } from "./services/languageLocalization.js";
import { APP_LANGUAGES } from "./contants/constants.js";

const mods = [
  {
    name: "Journey Map Mod",
    url: "pages/mods/journeymap-mod",
    imageName: "map.avif",
  },
  { name: "1.12.2", url: "pages/mods/1122", imageName: "1122.jpeg" },
  {
    name: "Minecraft PE 1.12.2",
    url: "pages/mods/1122/minecraft-pe-1-12-2",
    imageName: "1122pe.jpeg",
  },
  {
    name: "1.12.2 (Cars)",
    url: "pages/mods/1122/cars",
    imageName: "cars.jpeg",
  },
  {
    name: "1.12.2 (Oruzhie)",
    url: "pages/mods/1122/oruzhie",
    imageName: "oruzhie.jpeg",
  },
  { name: "1.16.5", url: "pages/mods/1165", imageName: "1165.jpeg" },
];

document.addEventListener("DOMContentLoaded", async () => {
  const activeLocale = getActiveLocale();
  console.log(activeLocale);
  renderListingHTML(
    mods.map((el) => ({
      ...el,
      url: `/${
        activeLocale === APP_LANGUAGES[0] ? el.url : activeLocale + "/" + el.url
      }`,
    }))
  );
});
