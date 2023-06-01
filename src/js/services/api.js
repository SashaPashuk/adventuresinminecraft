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
  const makeRequest = async () => {
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

  const response = await makeRequest();

  if (response?.code === "token_not_valid") {
    const response = await sendAPIRequestToRefreshToken();
    // console.log("response - refresh", response);
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
   * @returns
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
  /**
   * @param {String} itemId
   * @returns
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
   * @returns
   */
  updateShopItemInCart: (itemId, body) => {
    return sendAPIRequest({
      method: "POST",
      pathname: `/shop/order_item_change/${itemId}/`,
      body,
      hasToken: true,
    });
  },
};
