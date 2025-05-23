import logger from './logger.js';

/**
 * A wrapper function for `fetch` with before and after logging
 * @param {*} url Same as for fetch
 * @param {*} options Same as for fetch
 * @returns Same as for fetch
 */
async function fetchAndLog(url, options = { method: 'GET' }) {
  console.log(url);
  const { method, ...rest } = options;
  logger.debug('fetch', `${method} ${url}`, ...Object.values(rest));

  const response = await fetch(`http://localhost:3000${url}`, options);

  logger.debug('status', response.status);
  return response;
}

export default fetchAndLog;
