import { PlayersData } from "./PlayersData";

export const PlayerRoles = {
  batsman: {
    value: "Batsman",
    minPlayers: 3,
    maxPlayers: 7,
    name: "Batsman",
    stateKey: "selectedBatsman",
  },
  wicketKeeper: {
    value: "Wicket-Keeper",
    minPlayers: 1,
    maxPlayers: 5,
    name: "Wicket Keepers",
    stateKey: "selectedWicketKeepers",
  },
  allRounder: {
    value: "All-Rounder",
    minPlayers: 0,
    maxPlayers: 4,
    name: "All Rounders",
    stateKey: "selectedAllRounders",
  },

  bowler: {
    value: "Bowler",
    minPlayers: 3,
    maxPlayers: 7,
    name: "Bowlers",
    stateKey: "selectedBowlers",
  },
};

export const filterPlayersByRole = (role) => {
  const filteredPlayers = PlayersData.filter((player) => player.role === role);

  return filteredPlayers;
};

export const getTeamsShortNameObject = () => {
  const result = [];
  let i = 0;
  while (result.length !== 2) {
    const teamShortName = PlayersData[i].team_short_name;
    if (!result.includes(teamShortName)) {
      result.push(teamShortName);
    }
    i += 1;
  }
  const returnObj = result.reduce((acc, value) => {
    return { ...acc, [value]: 0 };
  }, {});
  return returnObj;
};

export const getPlayerListByIds = (idArray) => {
  const result = [];
  for (let i = 0; i < idArray.length; i++) {
    const data = PlayersData.find((player) => player.player_id === idArray[i]);
    result.push(data);
  }

  return result;
};
