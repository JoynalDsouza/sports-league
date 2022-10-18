import "./App.css";
import { useState } from "react";
import {
  PlayerRoles,
  getTeamsShortNameObject,
  filterPlayersByRole,
} from "./constants/constants";
import PlayerTableByRole from "./components/PlayerTableByRole";

function App() {
  const [selectedPlayers, setSelectedPlayers] = useState({
    batsmans: [],
    wicketKeepers: [],
    allRounders: [],
    bowlers: [],
    squadLength: 0,
    teamPlayersCount: getTeamsShortNameObject(),
  });

  const [credit, updateCredit] = useState(100);

  const { batsman, wicketKeeper, allRounder, bowler } = PlayerRoles;

  const handlePlayerClick = (player, role) => {
    //To check if player is already selected
    const isPlayerInSelectedPlayers = selectedPlayers[role].includes(
      player.player_id
    );
    //if player is in selected array, then remove the player from the array
    if (isPlayerInSelectedPlayers) {
      const updateArray = selectedPlayers[role].filter(
        (selectedPlayer) => selectedPlayer !== player.player_id
      );
      //add credits back
      updateCredit((prevCredit) => prevCredit + player.event_player_credit);
      setSelectedPlayers((prevState) => ({
        ...selectedPlayers,
        squadLength: prevState.squadLength - 1,
        teamPlayersCount: {
          ...prevState.teamPlayersCount,
          [player.team_short_name]:
            prevState.teamPlayersCount[player.team_short_name] - 1,
        },
        [role]: updateArray,
      }));
    } else {
      //if player is not in selected players then add to the array
      //check players are more than 11
      if (selectedPlayers.squadLength >= 11) {
        return alert("You can only select 11 players");
      }
      updateCredit((prevCredit) => prevCredit - player.event_player_credit);

      setSelectedPlayers((prevState) => ({
        ...selectedPlayers,

        squadLength: prevState.squadLength + 1,
        teamPlayersCount: {
          ...prevState.teamPlayersCount,
          [player.team_short_name]:
            prevState.teamPlayersCount[player.team_short_name] + 1,
        },
        [role]: [...selectedPlayers[role], player.player_id],
      }));
    }
  };

  const handleProceed = () => {
    const {
      squadLength,
      teamPlayersCount,
      batsmans,
      bowlers,
      allRounders,
      wicketKeepers,
    } = selectedPlayers;

    console.log(bowlers.length);
    if (squadLength !== 11) {
      return alert("Please select 11 players");
    }
    const teamsCountArray = Object.values(teamPlayersCount);
    if (teamsCountArray[0] > 7 || teamsCountArray[1] > 7) {
      return alert("You can only select max 7 players from a team");
    }
    if (credit < 0) {
      return alert("Credit limit exceeded");
    }
    if (
      batsmans.length < batsman.minPlayers ||
      batsmans.length > batsman.maxPlayers
    ) {
      return alert(
        `You can select batsman in range ${batsman.minPlayers} to ${batsman.maxPlayers}`
      );
    }
    if (
      wicketKeepers.length < wicketKeeper.minPlayers ||
      wicketKeepers.length > wicketKeeper.maxPlayers
    ) {
      return alert(
        `You can select wicket keepers in range ${wicketKeeper.minPlayers} to ${wicketKeeper.maxPlayers}`
      );
    }
    if (
      allRounders.length < allRounder.minPlayers ||
      allRounders.length > allRounder.maxPlayers
    ) {
      return alert(
        `You can select all rounders in range ${allRounder.minPlayers} to ${allRounder.maxPlayers}`
      );
    }
    if (
      bowlers.length < bowler.minPlayers ||
      bowlers.length > bowler.maxPlayers
    ) {
      return alert(
        `You can select bowler in range ${bowler.minPlayers} to ${bowler.maxPlayers}`
      );
    }

    return alert("Hello World");
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Pick Players</h1>

      <PlayerTableByRole
        role={batsman.name}
        minPlayers={batsman.minPlayers}
        maxPlayers={batsman.maxPlayers}
        players={filterPlayersByRole(batsman.value)}
        handlePlayerClick={handlePlayerClick}
        selectedPlayers={selectedPlayers.batsmans}
        stateKey={batsman.stateKey}
      />
      <PlayerTableByRole
        role={wicketKeeper.name}
        minPlayers={wicketKeeper.minPlayers}
        maxPlayers={wicketKeeper.maxPlayers}
        players={filterPlayersByRole(wicketKeeper.value)}
        handlePlayerClick={handlePlayerClick}
        selectedPlayers={selectedPlayers.wicketKeepers}
        stateKey={wicketKeeper.stateKey}
      />
      <PlayerTableByRole
        role={allRounder.name}
        minPlayers={allRounder.minPlayers}
        maxPlayers={allRounder.maxPlayers}
        players={filterPlayersByRole(allRounder.value)}
        handlePlayerClick={handlePlayerClick}
        selectedPlayers={selectedPlayers.allRounders}
        stateKey={allRounder.stateKey}
      />
      <PlayerTableByRole
        role={bowler.name}
        minPlayers={bowler.minPlayers}
        maxPlayers={bowler.maxPlayers}
        players={filterPlayersByRole(bowler.value)}
        handlePlayerClick={handlePlayerClick}
        selectedPlayers={selectedPlayers.bowlers}
        stateKey={bowler.stateKey}
      />

      <div className="proceedButton" onClick={handleProceed}>
        <p>Proceed</p>
      </div>
    </div>
  );
}

export default App;
