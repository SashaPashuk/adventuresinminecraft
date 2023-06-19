import { renderListingHTML } from "./utils/helpers.js";

const mods = [
  {
    name: "journeymap-mod",
    url: "/pages/mods/journeymap-mod",
    imageName: "map.avif",
  },
  { name: "1.12.2", url: "/pages/mods/1122", imageName: "1122.jpeg" },
  {
    name: "minecraft-pe-1-12-2",
    url: "/pages/mods/1122/minecraft-pe-1-12-2",
    imageName: "1122pe.jpeg",
  },
  { name: "1.12.2 cars", url: "/pages/mods/1122/cars", imageName: "cars.jpeg" },
  {
    name: "1.12.2 oruzhie",
    url: "/pages/mods/1122/oruzhie",
    imageName: "oruzhie.jpeg",
  },
  { name: "1.16.5", url: "/pages/mods/1165", imageName: "1165.jpeg" },
];

document.addEventListener("DOMContentLoaded", async () => {
  renderListingHTML(mods);
});
