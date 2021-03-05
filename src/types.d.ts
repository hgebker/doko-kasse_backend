type IncomeKey = 'tim' | 'jan' | 'ole' | 'hannes' | 'louisa' | 'sonstige';

type EveningEntry = [string, any];

type IncomeEntry = [IncomeKey, number];

type PlayerEntry = [PlayerKey, number];

type IncomeEntryObject = {
  [P in IncomeKey]: number;
};

interface Evening extends IncomeEntryObject {
  Datum: string;
  semester: Semester;
}

type EveningKey = keyof Evening;

type PlayerKey = Omit<IncomeKey, 'sonstige'>;

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
  sumPerPlayer: IncomeEntryObject;
  minPerPlayer: IncomeEntryObject;
  maxPerPlayer: IncomeEntryObject;
  noOfParticipationsPerPlayer: IncomeEntryObject;
  averagePerPlayer: IncomeEntryObject;
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
  wert: number;
  semester: Semester;
}
