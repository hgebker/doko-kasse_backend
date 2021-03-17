import { parseSum } from '../evenings/formatter';
import { filterIncomeEntries, filterPlayerEntries } from '../evenings/helper';

const defaultPlayerValues: IncomeEntryObject = {
  tim: 0,
  jan: 0,
  ole: 0,
  hannes: 0,
  louisa: 0,
  sonstige: 0,
};

const calculateNumberOfParticipationsForPlayers = (evenings: Evening[]): IncomeEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterIncomeEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        if (value) {
          playersValues[key] = playersValues[key] + 1;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as IncomeEntryObject
  );
};

const calculatePlayersTotal = (evenings: Evening[]): IncomeEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterIncomeEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        playersValues[key] += value;
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as IncomeEntryObject
  );
};

const calculateAveragePerPlayer = (evenings: Evening[]): IncomeEntryObject => {
  const sumPerPlayer = calculatePlayersTotal(evenings);
  const participationsPerPlayer = calculateNumberOfParticipationsForPlayers(evenings);
  const sumEntries = Object.entries(sumPerPlayer) as IncomeEntry[];

  return sumEntries.reduce(
    (averagePerPlayer, [player, value]) => {
      averagePerPlayer[player] = value ? value / participationsPerPlayer[player] : 0;
      return averagePerPlayer;
    },
    { ...defaultPlayerValues } as IncomeEntryObject
  );
};

const calculatePlayersMin = (evenings: Evening[]): IncomeEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterIncomeEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        if (!playersValues[key] || value < playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as IncomeEntryObject
  );
};

const calculatePlayersMax = (evenings: Evening[]): IncomeEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterIncomeEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        if (value > playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as IncomeEntryObject
  );
};

const calculateWorst = (averagePerPlayer: IncomeEntryObject): PlayerKey => {
  const entriesOfRealPlayers = filterPlayerEntries(Object.entries(averagePerPlayer));
  const maxValue = Math.max(...entriesOfRealPlayers.map(([, value]) => value));
  const [worstPlayer] = entriesOfRealPlayers.find(([, value]) => value === maxValue);

  return worstPlayer;
};

const calculateBest = (averagePerPlayer: IncomeEntryObject): PlayerKey => {
  const entriesOfRealPlayers = filterPlayerEntries(Object.entries(averagePerPlayer));
  const minValue = Math.min(...entriesOfRealPlayers.map(([, value]) => value));
  const [bestPlayer] = entriesOfRealPlayers.find(([, value]) => value === minValue);

  return bestPlayer;
};

const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.wert, 0);
};

const calculateTotalIncome = (evenings: Evening[]): number => {
  return evenings.reduce((total, evening) => total + parseSum(evening), 0);
};

const calculateSemesterReport = (evenings: Evening[]): SemesterReport => {
  const averagePerPlayer = calculateAveragePerPlayer(evenings);

  return {
    evenings,
    eveningCount: evenings.length,
    sumPerPlayer: calculatePlayersTotal(evenings),
    minPerPlayer: calculatePlayersMin(evenings),
    maxPerPlayer: calculatePlayersMax(evenings),
    noOfParticipationsPerPlayer: calculateNumberOfParticipationsForPlayers(evenings),
    averagePerPlayer,
    totalIncome: calculateTotalIncome(evenings),
    worst: calculateWorst(averagePerPlayer),
    best: calculateBest(averagePerPlayer),
  };
};

const calculateCashReport = (evenings: Evening[], expenses: Expense[]): CashReport => {
  const totalIncome = calculateTotalIncome(evenings);
  const totalExpenses = calculateTotalExpenses(expenses);
  const currentCash = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, currentCash };
};

export { calculateSemesterReport, calculateCashReport };
