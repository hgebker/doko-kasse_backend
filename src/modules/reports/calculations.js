const defaultPlayerValues = {
  tim: 0,
  jan: 0,
  ole: 0,
  hannes: 0,
  louisa: 0,
  sonstige: 0,
};

const filterPlayerValues = evening => {
  return Object.entries(evening).filter(function ([key]) {
    return !['Datum', 'semester'].includes(key);
  });
};

const calculateTotalIncome = evenings => {
  const sumPerPlayer = calculatePlayersTotal(evenings);

  return Object.values(sumPerPlayer).reduce(function (total, playersSum) {
    total += playersSum;
    return total;
  }, 0);
};

const calculatePlayersTotal = evenings => {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        playersValues[key] += value;
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
};

const calculatePlayersMin = evenings => {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        if (!playersValues[key] || value < playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
};

const calculatePlayersMax = evenings => {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        if (value > playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
};

const calculateNumberOfParticipationsForPlayers = evenings => {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        if (value) {
          playersValues[key] = playersValues[key] + 1;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
};

const calculateAveragePerPlayer = evenings => {
  const sumPerPlayer = calculatePlayersTotal(evenings);
  const participationsPerPlayer = calculateNumberOfParticipationsForPlayers(evenings);
  const sumEntries = Object.entries(sumPerPlayer);

  return sumEntries.reduce(
    function (averagePerPlayer, [player, value]) {
      averagePerPlayer[player] = value ? value / participationsPerPlayer[player] : 0;
      return averagePerPlayer;
    },
    { ...defaultPlayerValues }
  );
};

const calculateWorst = averagePerPlayer => {
  const entriesOfRealPlayers = Object.entries(averagePerPlayer).filter(([player]) => player !== 'sonstige');
  const maxValue = Math.max(...Object.values(Object.fromEntries(entriesOfRealPlayers)));
  const [worstPlayer] = entriesOfRealPlayers.find(([, value]) => value === maxValue);
  return worstPlayer;
};

const calculateBest = averagePerPlayer => {
  const entriesOfRealPlayers = Object.entries(averagePerPlayer).filter(([player]) => player !== 'sonstige');
  const minValue = Math.min(...Object.values(Object.fromEntries(entriesOfRealPlayers)));
  const [bestPlayer] = entriesOfRealPlayers.find(([, value]) => value === minValue);
  return bestPlayer;
};

const calculateReport = evenings => {
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

exports.calculateReport = calculateReport;
