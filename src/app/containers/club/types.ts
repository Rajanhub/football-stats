export interface IResponse {
  name: string;
  matches: Match[];
}

export interface Match {
  round: string;
  date: string;
  team1: string;
  team2: string;
  score?: Score;
}

export interface Score {
  ft: number[];
}

export interface Club {
  club: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  forms: any[];
}
