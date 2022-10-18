import "../App.css";

const PlayerTableByRole = ({
  role = "Batsman",
  minPlayers,
  maxPlayers,
  players = [],
  stateKey,
  handlePlayerClick = () => {},
  selectedPlayers,
}) => {
  return (
    <>
      <div>
        {minPlayers ? (
          <h2>{`Pick ${minPlayers}-${maxPlayers} ${role}`}</h2>
        ) : (
          <h2>{role}</h2>
        )}

        <div className="tableContainer">
          {players.map((player) => {
            const { name, event_player_credit, team_name, player_id } = player;

            return (
              <div
                key={player.id}
                className="playerNameCardContainer"
                style={{
                  backgroundColor: selectedPlayers?.includes(player_id)
                    ? "#9ef542"
                    : null,
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
    </>
  );
};

export default PlayerTableByRole;
