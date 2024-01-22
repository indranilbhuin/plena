export const formatNumber = number => {
  if (typeof number !== 'number') {
    return 'Invalid Number';
  }

  const absNumber = Math.abs(number);

  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (absNumber >= trillion) {
    return `${(number / trillion).toFixed(2)}T`;
  } else if (absNumber >= billion) {
    return `${(number / billion).toFixed(2)}B`;
  } else if (absNumber >= million) {
    return `${(number / million).toFixed(2)}M`;
  } else if (absNumber >= thousand) {
    return `${(number / thousand).toFixed(2)}K`;
  } else {
    return number.toFixed(2);
  }
};
