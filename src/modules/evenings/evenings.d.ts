export type Player = 'tim' | 'jan' | 'ole' | 'hannes' | 'louisa' | 'sonstige';

export type PlayerEntries = {
  [P in Player]: number;
};

export interface Evening extends PlayerEntries {
  Datum: string;
  semester: Semester;
}

export type EveningKey = keyof Evening;

export type IncomeKey = Omit<EveningKey, 'Datum' | 'semester'>;

export type PlayerKey = Omit<IncomeKey, 'sonstige'>;

export interface ParsedEvening extends Evening {
  sum?: number;
  avg?: number;
  max?: number;
  min?: number;
  maxPlayer?: string;
  minPlayer?: string;
}

type Semester = 'ws1819' | 'ss19' | 'ws1920' | 'ss20' | 'ws2021' | 'ss21';

interface SemesterReport {
  evenings: Evening[];
  eveningsCount: number;
  sumPerPlayer: PlayerEntries;
  minPerPlayer: PlayerEntries;
  maxPerPlayer: PlayerEntries;
  noOfParticipationsPerPlayer: PlayerEntries;
  averagePerPlayer: PlayerEntries;
  totalIncome: number;
  worst: Player;
  best: Player;
}

interface CashReport {
  totalIncome: number;
  totalExpenses: number;
  currentCash: number;
}
