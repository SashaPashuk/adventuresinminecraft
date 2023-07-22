import { gameServerSchemaGenerator } from "../utils/helpers.js";

const serverIP = "195.201.168.105";
const serverPort = 25565;

const defaultNumberEncreaseDecrease = 12;

function randomAddOrSubtractNumber(baseNumber, maxDelta) {
  const delta = Math.floor(Math.random() * (maxDelta * 2 + 1)) - maxDelta;

  const operation = Math.random() < 0.5 ? "add" : "subtract";

  const result = operation === "add" ? baseNumber + delta : baseNumber - delta;

  return result;
}

function isTimeDifference5Minutes(date1, date2) {
  const time1 = new Date(date1);
  const time2 = new Date(date2);

  const timeDifferenceInMilliseconds = Math.abs(time2 - time1);

  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

  return timeDifferenceInMinutes >= 5;
}

const randomUpdateNumberPlayers = (defaultNumber) => {
  let lsMSServerData = localStorage.getItem("msServerData");

  if (!lsMSServerData) {
    const updatedPlayers = randomAddOrSubtractNumber(
      defaultNumber,
      defaultNumberEncreaseDecrease
    );

    localStorage.setItem(
      "msServerData",
      JSON.stringify({ date: new Date(), players: updatedPlayers })
    );

    return updatedPlayers;
  }

  if (lsMSServerData) {
    const { players, date } = JSON.parse(lsMSServerData);

    if (isTimeDifference5Minutes(new Date(), date)) {
      const updatedPlayers = randomAddOrSubtractNumber(
        players,
        defaultNumberEncreaseDecrease
      );

      localStorage.setItem(
        "msServerData",
        JSON.stringify({
          date: new Date(),
          players: updatedPlayers,
        })
      );

      return updatedPlayers;
    }

    localStorage.setItem(
      "msServerData",
      JSON.stringify({
        date: isTimeDifference5Minutes(new Date(), date) ? new Date() : date,
        players,
      })
    );

    return players;
  }
};

function getNumberBasedOnTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const dayPeriod = localStorage.getItem("dayPeriod") || "day";

  if (currentHour >= 6 && currentHour < 18) {
    if (dayPeriod === "night") {
      localStorage.removeItem("msServerData");
    }
    localStorage.setItem("dayPeriod", "day");

    // Daytime: 200 - 400
    const defaultNumber = 274;
    const playersNumber = randomUpdateNumberPlayers(defaultNumber);

    return playersNumber;
  } else {
    if (dayPeriod === "day") {
      localStorage.removeItem("msServerData");
    }
    localStorage.setItem("dayPeriod", "night");

    // Nighttime: 5 - 199
    const defaultNumber = 127;
    const playersNumber = randomUpdateNumberPlayers(defaultNumber);

    return playersNumber;
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
