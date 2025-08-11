import "../App.css";

const PlayerTableByRole = ({
  role = "Batsman",
  minPlayers,
  maxPlayers,
  players = [],
  stateKey,
  handlePlayerClick = () => {},
  selectedPlayers,
  teamPlayersCount = {},
  squadLength,
}) => {
  const checkIfTeamPlayersExceed = (player_team_short_name) => {
    if (teamPlayersCount[player_team_short_name] >= 7) {
      return true;
    }
    return false;
  };

  return (
    <div className="playerByRoleContainer">
      <div>
        {minPlayers !== undefined ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>{`Pick ${minPlayers}-${maxPlayers} ${role}`}</h2>
            <p>{`${selectedPlayers.length} / ${players.length}`}</p>
          </div>
        ) : (
          <h2>{role}</h2>
        )}

        <div className="tableContainer">
          {players.map((player) => {
            const {
              name,
              event_player_credit,
              team_name,
              player_id,
              team_short_name,
            } = player;

            return (
              <div
                key={player.id}
                className="playerNameCardContainer"
                style={{
                  backgroundColor: selectedPlayers?.includes(player_id)
                    ? "#9ef542"
                    : null,
                  opacity:
                    (checkIfTeamPlayersExceed(team_short_name) ||
                      squadLength >= 11) &&
                    !selectedPlayers?.includes(player_id)
                      ? 0.5
                      : 1,
                }}
                onClick={() => handlePlayerClick(player, stateKey)}
              >
                <div className="playerNameCard">
                  <div>
                    <p className="playerName">{name}</p>
                    <p> {team_name}</p>
                  </div>
                  <p>{event_player_credit}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerTableByRole;
