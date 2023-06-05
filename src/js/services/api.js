const API_URL = "https://api.adventuresinminecraft.com/api/v1";

import * as Types from "../types/types.js";

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
  const makeRequest = async () => {
    const token = hasToken
      ? getTokens()?.access
        ? { Authorization: `Bearer ${getTokens().access}` }
        : {}
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

  const response = await makeRequest();

  if (response?.code === "token_not_valid") {
    const response = await sendAPIRequestToRefreshToken();

    if (response?.access) {
      return makeRequest();
    } else {
      window.location.href = "/pages/login.html";
      localStorage.removeItem("tokens");
    }
  }

  return response;
};

const sendAPIRequestToRefreshToken = async () => {
  const tokens = getTokens();

  const response = (
    await fetch(API_URL + "/user/refresh_token/", {
      method: "POST",
      body: JSON.stringify({ refresh: tokens.refresh }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
      redirect: "follow",
    })
  ).json();

  response.then((data) => {
    localStorage.setItem(
      "tokens",
      JSON.stringify({ ...tokens, access: data.access })
    );
  });

  return response;
};

export default {
  /**
   * @param {Object} body
   * @param {String} body.password
   * @param {String} body.email
   * @returns {Promise}
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
   * @returns {Promise}
   */
  login: (body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: "/user/login/",
      body,
    });
  },

  /**
   * @returns {Promise}
   */
  getShopOrdersRequest: () => {
    return sendAPIRequest({
      method: "GET",
      pathname: "/shop/orders/",
      hasToken: true,
    });
  },
  /**
   * @returns {Promise}
   */
  getShopOrderItems: () => {
    return sendAPIRequest({
      method: "GET",
      pathname: "/shop/order_items/",
      hasToken: true,
    });
  },
  /**
   * @param {String} languageCode
   * @param {Object} params
   * @param {String} params.type
   * @returns {Promise}
   */
  getShopItems: (languageCode, params) => {
    return sendAPIRequest({
      method: "GET",
      pathname: `/shop/${languageCode}/list/?type=${params.type}`,
    });
  },
  /**
   * @param {Object} params
   * @param {Object} params.languageCode
   * @param {String} params.itemId
   * @returns {Promise}
   */
  getOneShopItem: (params) => {
    return sendAPIRequest({
      method: "GET",
      pathname: `/shop/${params.languageCode}/get/${params.itemId}`,
    });
  },
  /**
   * @param {String} itemId
   * @param {Object} body
   * @param {number} body.amount
   * @param {string} body.item_id
   * @param {string} body.time_to_use 30 Days | Forever
   * @returns
   */
  addShopItemToCart: (body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/shop/add_to_basket/`,
      body,
      hasToken: true,
    });
  },
  /**
   * @param {String} itemId
   * @returns {Promise}
   */
  deleteShopItemFromCart: (itemId) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/shop/delete_from_basket/${itemId}/`,
      hasToken: true,
    });
  },
  /**
   * @param {String} itemId
   * @param {Object} body
   * @param {Number} body.amount
   * @returns {Promise}
   */
  updateShopItemInCart: (itemId, body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/shop/order_item_change/${itemId}/`,
      body,
      hasToken: true,
    });
  },
  /**
   * @param {Object} body
   * @param {Number} body.item_id
   * @param {Number} body.time_to_use
   * @returns {Promise}
   */
  updateShopItemDurationInCart: (body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/shop/change_duration/`,
      body,
      hasToken: true,
    });
  },
  /**
   * @promise {Types.IServer[]}
   */
  getShopServersRequest: () => {
    return sendAPIRequest({
      method: "GET",
      pathname: `/shop/servers/`,
      hasToken: true,
    });
  },

  /**
   * @param {Object} body
   * @param {String} body.user_nickname
   * @param {String} body.server
   * @returns {Promise}
   */
  createPaymentRequest: (body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/payment/create_payment/`,
      body: {
        ...body,
        return_url: "http://localhost:3000/pages/success-payment",
      },
      hasToken: true,
    });
  },
};
