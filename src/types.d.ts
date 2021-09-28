type PlayerKey = 'tim' | 'jan' | 'ole' | 'hannes' | 'louisa';

type EveningEntry = [string, any];

type PlayerEntry = [PlayerKey, number];

type PlayerEntryObject = {
  [P in PlayerKey]: number;
};

interface Evening extends PlayerEntryObject {
  Datum: string;
  semester: Semester;
  gezahlt: Boolean;
}

type EveningKey = keyof Evening;

interface ParsedEvening extends Evening {
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
  eveningCount: number;
  sumPerPlayer: PlayerEntryObject;
  minPerPlayer: PlayerEntryObject;
  maxPerPlayer: PlayerEntryObject;
  noOfParticipationsPerPlayer: PlayerEntryObject;
  averagePerPlayer: PlayerEntryObject;
  totalIncome: number;
  worst: PlayerKey;
  best: PlayerKey;
}

interface CashReport {
  totalIncome: number;
  totalExpenses: number;
  currentCash: number;
}

interface Expense {
  art: string;
  betrag: number;
  semester: Semester;
}

interface Earning {
  art: string;
  betrag: number;
  semester: Semester;
}
