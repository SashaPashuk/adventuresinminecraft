const homeSubtitle = document.getElementById("home_subtitle");

const serverIP = "195.201.168.105";
const serverPort = 25562;
let currentPlayerCount = 0;

function getServerStatus() {
  fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`)
    .then((response) => response.json())
    .then((data) => {
      if (data["online"]) {
        currentPlayerCount = data.players.online;
      } else {
        console.log("Server is offline");
      }
    })
    .catch((error) => {
      console.error("Error fetching server status:", error);
    });
}

getServerStatus();
setInterval(getServerStatus, 2 * 60 * 1000);

homeSubtitle.innerHTML = `<span>Сейчас играют ${currentPlayerCount} игроков</span>
<span>${serverIP}</span>
`;
