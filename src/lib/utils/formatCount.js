// Configuration
const NUMBER_FORMATS = [
  {
    // 0 - 999
    letter: '',
    limit: 1e3
  },
  {
    // 1,000 - 999,999
    letter: 'K',
    limit: 1e6
  },
  {
    // 1,000,000 - 999,999,999
    letter: 'M',
    limit: 1e9
  },
  {
    // 1,000,000,000 - 999,999,999,999
    letter: 'B',
    limit: 1e12
  },
  {
    // 1,000,000,000,000 - 999,999,999,999,999
    letter: 'T',
    limit: 1e15
  }
];

export function formatCount(value) {
  const format = NUMBER_FORMATS.find((format) => value < format.limit);

  value = (1000 * value) / format.limit;
  value = Math.round(value * 10) / 10;
  return value + format.letter;
}
