import "./App.css";
import { useEffect, useState } from "react";
import { PlayersData } from "./constants/PlayersData";
import { PlayerRoles } from "./constants/constants";
import PlayerTableByRole from "./components/PlayerTableByRole";

function App() {
  const [selectedPlayers, setSelectedPlayers] = useState({
    batsman: [],
    wicketKeepers: [],
    allRounders: [],
    bowlers: [],
  });

  const [credit, updateCredit] = useState(100);

  // useEffect(() => {
  //   // console.table(selectedPlayers);
  //   console.log(credit);
  // }, [credit]);

  const handlePlayerClick = (player, role) => {
    const isPlayerInSelectedPlayers = selectedPlayers[role].includes(
      player.player_id
    );

    if (isPlayerInSelectedPlayers) {
      const updateArray = selectedPlayers[role].filter(
        (selectedPlayer) => selectedPlayer !== player.player_id
      );
      updateCredit((prevCredit) => prevCredit + player.event_player_credit);
      setSelectedPlayers({ ...selectedPlayers, [role]: updateArray });
    } else {
      updateCredit((prevCredit) => prevCredit - player.event_player_credit);

      setSelectedPlayers({
        ...selectedPlayers,
        [role]: [...selectedPlayers[role], player.player_id],
      });
    }
  };

  const filterPlayersByRole = (role) => {
    const filteredPlayers = PlayersData.filter(
      (player) => player.role === role
    );

    return filteredPlayers;
  };
  const { batsman, wicketKeeper, allRounder, bowler } = PlayerRoles;
  return (
    <div className="App">
      <h1>Pick Players</h1>

      <PlayerTableByRole
        role={batsman.name}
        minPlayers={batsman.minPlayers}
        maxPlayers={batsman.maxPlayers}
        players={filterPlayersByRole(batsman.value)}
        handlePlayerClick={handlePlayerClick}
        selectedPlayers={selectedPlayers.batsman}
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

      <div
        style={{
          textAlign: "center",
          border: "2px solid black",
          marginTop: "10px",
        }}
      >
        <p>Proceed</p>
      </div>
    </div>
  );
}

export default App;
