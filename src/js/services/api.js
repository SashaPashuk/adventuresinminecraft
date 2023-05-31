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
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
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
    return sendAPIRequest("POST", "/user/register/", body);
  },
  /**
   * @param {Object} body
   * @param {String} body.email_code
   * @param {String} body.username
   * @param {String} body.password
   * @returns
   */
  login: (body) => {
    return sendAPIRequest("POST", "/user/login/", body);
  },
  /**
   * @param {Object} body
   * @param {String} body.refresh
   * @returns
   */
  refreshToken: (body) => {
    return sendAPIRequest("POST", "/user/refresh_token/", body);
  },
  /**
   * @returns
   */
  getShopOrderItems: () => {
    return sendAPIRequest("GET", "/shop/order_items/");
  },
  /**
   * @param {String} languageCode
   * @param {Object} params
   * @param {String} params.type
   * @returns
   */
  getShopItems: (languageCode, params) => {
    return sendAPIRequest(
      "GET",
      `/shop/${languageCode}/list/?type=${params.type}`
    );
  },
};
