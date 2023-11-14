import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
export function getReferrer(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}referrer/profile`, requestOptions).then(
    authService.handleResponse
  );
}

export function getTransactions(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}referrer/transactions`, requestOptions).then(
    authService.handleResponse
  );
}

export function getDashboard(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}referrer/dashboard`, requestOptions).then(
    authService.handleResponse
  );
}
