const numberPlayers = document.getElementById("number_players");
const mcServerStatusElement = document.getElementById("mc_server_status");

const serverIP = "195.201.168.105";
const serverPort = 25562;
let currentPlayerCount = 0;

function getServerStatus() {
  fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`)
    .then((response) => response.json())
    .then((data) => {
      if (data?.online) {
        currentPlayerCount = data.players.online;
        mcServerStatusElement.innerHTML = "Online";
        mcServerStatusElement.classList.remove("offline");
      } else {
        console.log("Server is offline");
        mcServerStatusElement.innerHTML = "Offline";
        mcServerStatusElement.classList.add("offline");
      }
    })
    .catch((error) => {
      console.error("Error fetching server status:", error);
    });
}

getServerStatus();
setInterval(getServerStatus, 2 * 60 * 1000);

numberPlayers.innerHTML = currentPlayerCount;
