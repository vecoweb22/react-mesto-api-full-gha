// export const BASE_URL = 'https://vecoweb22.nomoredomains.rocks';
export const BASE_URL = 'https://api.vecoweb22.nomoredomains.rocks';
// export const BASE_URL = 'http://localhost:3000';

function getResp(res) {
  if (!res.ok) {
    return res.json().then((res) => {
      throw new Error(res.message);
    });
  }
  return res.json();
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  }).then((res) => getResp(res));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  })
    .then((res) => getResp(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('authUser', true);
        return data;
      }
    });
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
  }).then((res) => getResp(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: "include",
  })
    .then((res) => getResp(res))
}
