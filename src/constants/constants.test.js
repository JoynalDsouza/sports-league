import {
  filterPlayersByRole,
  PlayerRoles,
  getTeamsShortNameObject,
  getPlayerListByIds,
} from "./constants";

const MockPlayersData = [
  {
    id: 4524,
    player_id: "1160",
    name: "Zahir Khan",
    role: "Bowler",
    country: "Afghanistan",
    short_name: "Zahir Khan",
    team_name: "Melbourne Stars",
    team_logo:
      "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png",
    team_short_name: "MS",
    event_total_points: 214,
    event_player_credit: 8.5,
    team_id: 477,
    is_playing: false,
    player_stats_available: false,
  },

  {
    id: 5914,
    player_id: "43584",
    name: "Ashton Turner",
    role: "Batsman",
    country: "Australia",
    short_name: "AJ Turner",
    team_name: "Perth Scorchers",
    team_logo:
      "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png",
    team_short_name: "PS",
    event_total_points: 349,
    event_player_credit: 9,
    team_id: 467,
    is_playing: false,
    player_stats_available: false,
  },
  {
    id: 5910,
    player_id: "81",
    name: "Glenn Maxwell",
    role: "All-Rounder",
    country: "Australia",
    short_name: "GJ Maxwell",
    team_name: "Melbourne Stars",
    team_logo:
      "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png",
    team_short_name: "MS",
    event_total_points: 735,
    event_player_credit: 9.5,
    team_id: 477,
    is_playing: false,
    player_stats_available: false,
  },
  {
    id: 5918,
    player_id: "1955",
    name: "Ashton Agar",
    role: "All-Rounder",
    country: "Australia",
    short_name: "AC Agar",
    team_name: "Perth Scorchers",
    team_logo:
      "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png",
    team_short_name: "PS",
    event_total_points: 0,
    event_player_credit: 8,
    team_id: 467,
    is_playing: false,
    player_stats_available: false,
  },
];

test("Test playerbyRole function", () => {
  expect(
    filterPlayersByRole(PlayerRoles.bowler.value, MockPlayersData)
  ).toEqual([
    {
      id: 4524,
      player_id: "1160",
      name: "Zahir Khan",
      role: "Bowler",
      country: "Afghanistan",
      short_name: "Zahir Khan",
      team_name: "Melbourne Stars",
      team_logo:
        "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png",
      team_short_name: "MS",
      event_total_points: 214,
      event_player_credit: 8.5,
      team_id: 477,
      is_playing: false,
      player_stats_available: false,
    },
  ]);

  expect(filterPlayersByRole("Hello", MockPlayersData)).toEqual([]);

  expect(
    filterPlayersByRole(PlayerRoles.batsman.value, MockPlayersData)
  ).toEqual([
    {
      id: 5914,
      player_id: "43584",
      name: "Ashton Turner",
      role: "Batsman",
      country: "Australia",
      short_name: "AJ Turner",
      team_name: "Perth Scorchers",
      team_logo:
        "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png",
      team_short_name: "PS",
      event_total_points: 349,
      event_player_credit: 9,
      team_id: 467,
      is_playing: false,
      player_stats_available: false,
    },
  ]);

  expect(
    filterPlayersByRole(PlayerRoles.wicketKeeper.value, MockPlayersData)
  ).toEqual([]);

  expect(
    filterPlayersByRole(PlayerRoles.allRounder.value, MockPlayersData)
  ).toEqual([
    {
      id: 5910,
      player_id: "81",
      name: "Glenn Maxwell",
      role: "All-Rounder",
      country: "Australia",
      short_name: "GJ Maxwell",
      team_name: "Melbourne Stars",
      team_logo:
        "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png",
      team_short_name: "MS",
      event_total_points: 735,
      event_player_credit: 9.5,
      team_id: 477,
      is_playing: false,
      player_stats_available: false,
    },
    {
      id: 5918,
      player_id: "1955",
      name: "Ashton Agar",
      role: "All-Rounder",
      country: "Australia",
      short_name: "AC Agar",
      team_name: "Perth Scorchers",
      team_logo:
        "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png",
      team_short_name: "PS",
      event_total_points: 0,
      event_player_credit: 8,
      team_id: 467,
      is_playing: false,
      player_stats_available: false,
    },
  ]);
});

test("Test getTeamObject function", () => {
  expect(getTeamsShortNameObject(MockPlayersData)).toEqual({ PS: 0, MS: 0 });
  expect(getTeamsShortNameObject(MockPlayersData)).not.toEqual({
    MS: 0,
    PS: 1,
  });
});

test("Test getPlayerListbyIds function", () => {
  expect(getPlayerListByIds(["1160", "43584"], MockPlayersData)).toEqual([
    {
      id: 4524,
      player_id: "1160",
      name: "Zahir Khan",
      role: "Bowler",
      country: "Afghanistan",
      short_name: "Zahir Khan",
      team_name: "Melbourne Stars",
      team_logo:
        "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png",
      team_short_name: "MS",
      event_total_points: 214,
      event_player_credit: 8.5,
      team_id: 477,
      is_playing: false,
      player_stats_available: false,
    },

    {
      id: 5914,
      player_id: "43584",
      name: "Ashton Turner",
      role: "Batsman",
      country: "Australia",
      short_name: "AJ Turner",
      team_name: "Perth Scorchers",
      team_logo:
        "https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png",
      team_short_name: "PS",
      event_total_points: 349,
      event_player_credit: 9,
      team_id: 467,
      is_playing: false,
      player_stats_available: false,
    },
  ]);
});
