export const isValidHttpUrl = (string, host) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return (url.host && url.host !== host && url.protocol === 'http:') || url.protocol === 'https:';
};
