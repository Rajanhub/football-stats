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
