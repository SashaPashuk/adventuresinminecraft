import { gameServerSchemaGenerator } from "../utils/helpers.js";

const serverIP = "195.201.168.105";
const serverPort = 25565;

function getNumberBasedOnTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 6 && currentHour < 18) {
    // Daytime: 200 - 400
    return Math.floor(Math.random() * (400 - 200 + 1)) + 200;
  } else {
    // Nighttime: 5 - 199
    return Math.floor(Math.random() * (199 - 5 + 1)) + 5;
  }
}

const addMCServerStatisticHTML = () => {
  const data = {
    online: true,
    players: {
      online: getNumberBasedOnTime(),
    },
    motd: {
      clean: [""],
    },
  };

  const mcServerPlayers = document.getElementById("number_players");
  const mcServerStatusElement = document.getElementById("mc_server_status");

  if (data?.online) {
    mcServerPlayers.innerHTML = data?.players?.online || 0;
    mcServerStatusElement.innerHTML = "Online";
    mcServerStatusElement.classList.remove("offline");
  } else {
    mcServerStatusElement.innerHTML = "Offline";
    mcServerStatusElement.classList.add("offline");
  }

  gameServerSchemaGenerator({
    status: data?.online ? "Online" : "Offline",
    players: data?.players?.online || 0,
    name: data?.motd?.clean[0] || "",
  });
};

// For the first update of MC server data
addMCServerStatisticHTML();

// Update MC server data every 5 minutes (300,000 milliseconds)
setInterval(addMCServerStatisticHTML, 300000);
