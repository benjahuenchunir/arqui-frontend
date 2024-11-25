export interface Team {
  id: number;
  name: string;
  logo_url: string;
}

export interface TeamGoals {
  goals: number | null;
  team: Team;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo_url: string;
  flag_url: string;
  season: number;
  round: string;
}

export interface OddValue {
  id: number;
  value: number;
  bet: string;
}

export interface Odd {
  id: number;
  name: string;
  values: OddValue[];
}

export interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  status_long: string;
  status_short: string;
  status_elapsed: number | null;
  home_team: TeamGoals;
  away_team: TeamGoals;
  league: League;
  odds: Odd[];
  remaining_bets: number;
  reserved_home: number, 
  reserved_away: number, 
  reserved_draw: number
}