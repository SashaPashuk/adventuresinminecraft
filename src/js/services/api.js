const API_URL = "https://api.adventuresinminecraft.com/api/v1";

/**
 * Send API request to SERVER API
 * @param {'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH'} method
 * @param {string} pathname
 * @param {*} [body]
 * @param {RequestInit} [config]
 * @returns
 */
const sendAPIRequest = async (method, pathname, body, config) => {
  return (
    await fetch(API_URL + pathname, {
      method,
      body: JSON.stringify(body) || undefined,
    })
  ).json();
};

export default {
  /**
   * @param {Object} body
   * @param {String} body.password
   * @param {String} body.email
   * @returns
   */
  signup: (body) => {
    return sendAPIRequest("POST", "/user/register", body);
  },
};
