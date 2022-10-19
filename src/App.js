import "./App.css";
import { useEffect, useState } from "react";
import {
  PlayerRoles,
  getTeamsShortNameObject,
  filterPlayersByRole,
  getPlayerListByIds,
} from "./constants/constants";
import PlayerTableByRole from "./components/PlayerTableByRole";

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  const [selectedPlayers, setSelectedPlayers] = useState({
    batsmans: [],
    wicketKeepers: [],
    allRounders: [],
    bowlers: [],
    squadLength: 0,
    teamPlayersCount: getTeamsShortNameObject(),
  });

  const [credit, updateCredit] = useState(100);

  //whenever currentPage state changes
  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  //destructure constants data
  const { batsman, wicketKeeper, allRounder, bowler } = PlayerRoles;

  //destructure state selectedPlayersData
  const {
    squadLength,
    teamPlayersCount,
    batsmans,
    bowlers,
    allRounders,
    wicketKeepers,
  } = selectedPlayers;

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

    //if all cases are valid then move to squad page
    return setCurrentPage("secondary");
  };

  const handleBack = () => {
    setCurrentPage("main");
    setSelectedPlayers({
      batsmans: [],
      wicketKeepers: [],
      allRounders: [],
      bowlers: [],
      squadLength: 0,
      teamPlayersCount: getTeamsShortNameObject(),
    });
    updateCredit(100);
  };

  if (currentPage == "main") {
    //main page
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Pick Players</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>{`Squad Length : ${squadLength} / 11`}</p>
          <p>{`Credits remaining : ${credit}`}</p>
        </div>

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

        <div className="button" onClick={handleProceed}>
          <p>Proceed</p>
        </div>
      </div>
    );
  } else {
    //my Squad page
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Your Squad</h1>
        <PlayerTableByRole
          role={batsman.name}
          players={getPlayerListByIds(batsmans)}
        />
        <PlayerTableByRole
          role={wicketKeeper.name}
          players={getPlayerListByIds(wicketKeepers)}
        />
        <PlayerTableByRole
          role={allRounder.name}
          players={getPlayerListByIds(allRounders)}
        />
        <PlayerTableByRole
          role={bowler.name}
          players={getPlayerListByIds(bowlers)}
        />

        <div className="button" onClick={handleBack}>
          <p>Go Back</p>
        </div>
      </div>
    );
  }
}

export default App;
