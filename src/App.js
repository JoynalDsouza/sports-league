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
    selectedBatsman: [],
    selectedWicketKeepers: [],
    selectedAllRounders: [],
    selectedBowlers: [],
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
    selectedBatsman,
    selectedBowlers,
    selectedAllRounders,
    selectedWicketKeepers,
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
      selectedBatsman.length < batsman.minPlayers ||
      selectedBatsman.length > batsman.maxPlayers
    ) {
      return alert(
        `You can select batsman in range ${batsman.minPlayers} to ${batsman.maxPlayers}`
      );
    }
    if (
      selectedWicketKeepers.length < wicketKeeper.minPlayers ||
      selectedWicketKeepers.length > wicketKeeper.maxPlayers
    ) {
      return alert(
        `You can select wicket keepers in range ${wicketKeeper.minPlayers} to ${wicketKeeper.maxPlayers}`
      );
    }
    if (
      selectedAllRounders.length < allRounder.minPlayers ||
      selectedAllRounders.length > allRounder.maxPlayers
    ) {
      return alert(
        `You can select all rounders in range ${allRounder.minPlayers} to ${allRounder.maxPlayers}`
      );
    }
    if (
      selectedBowlers.length < bowler.minPlayers ||
      selectedBowlers.length > bowler.maxPlayers
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
      selectedBatsman: [],
      selectedWicketKeepers: [],
      selectedAllRounders: [],
      selectedBowlers: [],
      squadLength: 0,
      teamPlayersCount: getTeamsShortNameObject(),
    });
    updateCredit(100);
  };

  if (currentPage === "main") {
    //main page
    return (
      <div className="App">
        <div className="container">
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
            selectedPlayers={selectedBatsman}
            stateKey={batsman.stateKey}
          />
          <PlayerTableByRole
            role={wicketKeeper.name}
            minPlayers={wicketKeeper.minPlayers}
            maxPlayers={wicketKeeper.maxPlayers}
            players={filterPlayersByRole(wicketKeeper.value)}
            handlePlayerClick={handlePlayerClick}
            selectedPlayers={selectedWicketKeepers}
            stateKey={wicketKeeper.stateKey}
          />
          <PlayerTableByRole
            role={allRounder.name}
            minPlayers={allRounder.minPlayers}
            maxPlayers={allRounder.maxPlayers}
            players={filterPlayersByRole(allRounder.value)}
            handlePlayerClick={handlePlayerClick}
            selectedPlayers={selectedAllRounders}
            stateKey={allRounder.stateKey}
          />
          <PlayerTableByRole
            role={bowler.name}
            minPlayers={bowler.minPlayers}
            maxPlayers={bowler.maxPlayers}
            players={filterPlayersByRole(bowler.value)}
            handlePlayerClick={handlePlayerClick}
            selectedPlayers={selectedBowlers}
            stateKey={bowler.stateKey}
          />

          <div className="button" onClick={handleProceed}>
            <p>Proceed</p>
          </div>
        </div>
      </div>
    );
  } else {
    //my Squad page
    return (
      <div className="App">
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Your Squad</h1>
          <PlayerTableByRole
            role={batsman.name}
            players={getPlayerListByIds(selectedBatsman)}
          />
          <PlayerTableByRole
            role={wicketKeeper.name}
            players={getPlayerListByIds(selectedWicketKeepers)}
          />
          <PlayerTableByRole
            role={allRounder.name}
            players={getPlayerListByIds(selectedAllRounders)}
          />
          <PlayerTableByRole
            role={bowler.name}
            players={getPlayerListByIds(selectedBowlers)}
          />

          <div className="button" onClick={handleBack}>
            <p>Go Back</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
