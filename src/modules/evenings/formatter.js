const PLAYERS = ['tim', 'jan', 'ole', 'hannes', 'louisa', 'sonstige'];

const formatNumber = number => `${number.toFixed(2)} €`.replace('.', ',');

const formatItem = item => {
  const entries = Object.entries(item);
  // Filter out the players and get their the values of whom participated
  const filteredItems = entries.filter(([key]) => PLAYERS.includes(key));
  const playerValues = filteredItems.filter(([key, value]) => key !== 'sonstige' && value).map(([, value]) => value);

  const sum = playerValues.reduce((sum, el) => sum + el, 0);
  const avg = sum / playerValues.length;

  const max = Math.max(...playerValues);
  const maxPlayer = PLAYERS.filter(key => item[key] === max).join(', ');

  const min = Math.min(...playerValues);
  const minPlayer = PLAYERS.filter(key => item[key] === min).join(', ');

  return {
    Datum: item.Datum,
    semester: item.semester,
    ...Object.fromEntries(filteredItems.map(([key, value]) => [key, formatNumber(value)])),
    sum: formatNumber(sum),
    avg: formatNumber(avg),
    max: `${maxPlayer} - ${formatNumber(max)}`,
    min: `${minPlayer} - ${formatNumber(min)}`,
  };
};

exports.formatItem = formatItem;