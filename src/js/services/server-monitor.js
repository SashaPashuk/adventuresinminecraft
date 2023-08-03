import { gameServerSchemaGenerator } from "../utils/helpers.js";

// const serverIP = "195.201.168.105";
// const serverPort = 25565;

const daytimeRange = { min: 2000, max: 3500 };
const nighttimeRange = { min: 1500, max: 2500 };

function randomAddOrSubtractNumber(baseNumber, range) {
  const delta =
    Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

  return baseNumber + delta;
}

function isTimeDifference5Minutes(date1, date2) {
  const time1 = new Date(date1);
  const time2 = new Date(date2);

  const timeDifferenceInMilliseconds = Math.abs(time2 - time1);

  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

  return timeDifferenceInMinutes >= 5;
}

function getRandomNumberInRange(range) {
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

const randomUpdateNumberPlayers = (range) => {
  let lsMSServerData = localStorage.getItem("msServerData");

  if (
    !lsMSServerData ||
    isTimeDifference5Minutes(new Date(), JSON.parse(lsMSServerData).date)
  ) {
    const players = getRandomNumberInRange(range);

    localStorage.setItem(
      "msServerData",
      JSON.stringify({ date: new Date(), players })
    );

    return players;
  }

  return JSON.parse(lsMSServerData).players;
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

    // Daytime: 2000 - 3500
    const playersNumber = randomUpdateNumberPlayers(daytimeRange);
    return playersNumber;
  } else {
    if (dayPeriod === "day") {
      localStorage.removeItem("msServerData");
    }
    localStorage.setItem("dayPeriod", "night");

    // Nighttime: 1500 - 2500
    const playersNumber = randomUpdateNumberPlayers(nighttimeRange);
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
