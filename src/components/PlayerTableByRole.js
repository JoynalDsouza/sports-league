const PlayerTableByRole = ({
  role = "Batsman",
  minPlayers = 3,
  maxPlayers = 7,
  players = [],
  stateKey,
  handlePlayerClick,
  selectedPlayers,
}) => {
  return (
    <>
      <div>
        <h2>{`Pick ${minPlayers}-${maxPlayers} ${role}`}</h2>
        <div>
          {players.map((player) => {
            const { name, event_player_credit, team_name, player_id } = player;

            return (
              <div
                key={player.id}
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: selectedPlayers?.includes(player_id)
                    ? "green"
                    : null,
                }}
                onClick={() => handlePlayerClick(player, stateKey)}
              >
                <div>
                  <p>
                    {name} <br></br> {team_name}
                  </p>
                </div>
                <p>{event_player_credit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlayerTableByRole;
