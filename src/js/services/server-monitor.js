import { gameServerSchemaGenerator } from "../utils/helpers.js";

const serverIP = "195.201.168.105";
const serverPort = 25565;

const getMCServerData = async (ip, port) => {
  const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`).then(
    (response) => response.json()
  );

  return response;
};

const addMCServerStatisticHTML = async ({ getMCServerData }) => {
  const data = await getMCServerData();

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

// For the first fast taking MC server data
addMCServerStatisticHTML({
  getMCServerData: () => getMCServerData(serverIP, serverPort),
});
// Rapidly after some time update MC server data
setInterval(
  () =>
    addMCServerStatisticHTML({
      getMCServerData: () => getMCServerData(serverIP, serverPort),
    }),
  2 * 60 * 1000
);
