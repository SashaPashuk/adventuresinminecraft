/**
 * @param {Object} param
 * @param {String} param.message
 * @param {Number} param.duration
 * @returns {void}
 */
export const addToastNotification = ({ message, duration = 1500 }) => {
  const toastContainer = document.querySelector(".toast-container");

  const toastHTML = `
      <div>
        <p>${message}</p>
      </div>
    `;

  toastContainer.classList.remove("hidden");
  toastContainer.innerHTML = toastHTML;

  setTimeout(() => {
    toastContainer.classList.add("hidden");
    toastContainer.innerHTML = "";
  }, duration);
};
