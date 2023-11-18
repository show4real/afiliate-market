import settings from "./settings";

export const authService = {
  login,
  register,
  handleResponse,
};

export function login({ email, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${settings.API_URL}login/referrer`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.user) {
        response.user.token = response.token;
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    });
}

export function register({ name, email, phone, referrer, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, phone, referrer, password }),
  };
  return fetch(`${settings.API_URL}signup`, requestOptions).then(handleResponse);
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        //logout();
      } else if (response.status === 403) {
        window.location.href = "/";
      }

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
