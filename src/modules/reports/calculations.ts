import { parseSum } from '../evenings/formatter';
import { filterPlayerEntries } from '../evenings/helper';

const defaultPlayerValues: PlayerEntryObject = {
  tim: 0,
  jan: 0,
  ole: 0,
  hannes: 0,
  louisa: 0,
};

const calculateNumberOfParticipationsForPlayers = (evenings: Evening[]): PlayerEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterPlayerEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        if (value) {
          playersValues[key] = playersValues[key] + 1;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as PlayerEntryObject
  );
};

const calculatePlayersTotal = (evenings: Evening[]): PlayerEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterPlayerEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        playersValues[key] += value;
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as PlayerEntryObject
  );
};

const calculateAveragePerPlayer = (evenings: Evening[]): PlayerEntryObject => {
  const sumPerPlayer = calculatePlayersTotal(evenings);
  const participationsPerPlayer = calculateNumberOfParticipationsForPlayers(evenings);
  const sumEntries = Object.entries(sumPerPlayer) as PlayerEntry[];

  return sumEntries.reduce(
    (averagePerPlayer, [player, value]) => {
      averagePerPlayer[player] = value ? value / participationsPerPlayer[player] : 0;
      return averagePerPlayer;
    },
    { ...defaultPlayerValues } as PlayerEntryObject
  );
};

const calculatePlayersMin = (evenings: Evening[]): PlayerEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterPlayerEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        if (!playersValues[key] || value < playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as PlayerEntryObject
  );
};

const calculatePlayersMax = (evenings: Evening[]): PlayerEntryObject => {
  return evenings.reduce(
    (playersValues, evening) => {
      const playerEntries = filterPlayerEntries(Object.entries(evening));

      playerEntries.forEach(([key, value]) => {
        if (value > playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues } as PlayerEntryObject
  );
};

const calculateWorst = (averagePerPlayer: PlayerEntryObject): PlayerKey => {
  const entriesOfRealPlayers = filterPlayerEntries(Object.entries(averagePerPlayer));
  const maxValue = Math.max(...entriesOfRealPlayers.map(([, value]) => value));
  const [worstPlayer] = entriesOfRealPlayers.find(([, value]) => value === maxValue);

  return worstPlayer;
};

const calculateBest = (averagePerPlayer: PlayerEntryObject): PlayerKey => {
  const entriesOfRealPlayers = filterPlayerEntries(Object.entries(averagePerPlayer));
  const minValue = Math.min(...entriesOfRealPlayers.map(([, value]) => value));
  const [bestPlayer] = entriesOfRealPlayers.find(([, value]) => value === minValue);

  return bestPlayer;
};

const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.betrag, 0);
};

const calculateTotalRegularIncome = (evenings: Evening[]): number => {
  return evenings.reduce((total, evening) => total + parseSum(evening), 0);
};

const calculateTotalExtraIncome = (earnings: Earning[]): number => {
  return earnings.reduce((total, earning) => total + earning.betrag, 0);
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
    totalIncome: calculateTotalRegularIncome(evenings),
    worst: calculateWorst(averagePerPlayer),
    best: calculateBest(averagePerPlayer),
  };
};

const calculateCashReport = (evenings: Evening[], expenses: Expense[], earnings: Earning[]): CashReport => {
  const totalRegularIncome = calculateTotalRegularIncome(evenings);
  const totalExtraIncome = calculateTotalExtraIncome(earnings);
  const totalExpenses = calculateTotalExpenses(expenses);
  const totalIncome = totalRegularIncome + totalExtraIncome;
  const currentCash = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, currentCash };
};

export { calculateSemesterReport, calculateCashReport };
