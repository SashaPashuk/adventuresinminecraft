const API_URL = "https://api.adventuresinminecraft.com/api/v1";

const getTokens = () => {
  const tokens = localStorage.getItem("tokens");

  return JSON.parse(tokens);
};

/**
 * Send API request to SERVER API
 * @param {'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH'} method
 * @param {string} pathname
 * @param {*} [body]
 * @param {RequestInit} [config]
 * @returns
 */
const sendAPIRequest = async ({ method, pathname, body, hasToken }) => {
  const token = hasToken
    ? { Authorization: `Bearer ${getTokens().access}` }
    : {};

  return (
    await fetch(API_URL + pathname, {
      method,
      body: (body && JSON.stringify(body)) || undefined,
      headers: {
        "Content-Type": "application/json",
        ...token,
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
    return sendAPIRequest({
      method: "POST",
      pathname: "/user/register/",
      body,
    });
  },
  /**
   * @param {Object} body
   * @param {String} body.email_code
   * @param {String} body.username
   * @param {String} body.password
   * @returns
   */
  login: (body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: "/user/login/",
      body,
    });
  },
  /**
   * @param {Object} body
   * @param {String} body.refresh
   * @returns
   */
  refreshToken: (body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: "/user/refresh_token/",
      body,
    });
  },
  /**
   * @returns
   */
  getShopOrderItems: () => {
    return sendAPIRequest({ method: "GET", pathname: "/shop/order_items/" });
  },
  /**
   * @param {String} languageCode
   * @param {Object} params
   * @param {String} params.type
   * @returns
   */
  getShopItems: (languageCode, params) => {
    return sendAPIRequest({
      method: "GET",
      pathname: `/shop/${languageCode}/list/?type=${params.type}`,
    });
  },
  /**
   * @param {String} itemId
   * @returns
   */
  addShopItemToCart: (itemId) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/shop/add_to_basket/${itemId}/`,
      hasToken: true,
    });
  },
};
