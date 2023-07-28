export const redirectForPaths = () => {
  const pathsForRedirect = {
    "/ru/home": "/ru",
    "/home": "/",
  };

  if (pathsForRedirect[window.location.pathname]) {
    window.open(pathsForRedirect[window.location.pathname], "_self");
  }
};
