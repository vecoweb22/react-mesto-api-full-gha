export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResp(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitCards() {
    const cardsUrl = `${this._baseUrl}/cards`;
    return fetch(cardsUrl, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResp(res));
  }

  getUserData() {
    const userInfoUrl = `${this._baseUrl}/users/me`;
    return fetch(userInfoUrl, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResp(res));
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this._checkResp(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResp(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResp(res));
  }

  _setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResp(res));
  }

  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResp(res));
  }


  toggleLike(cardId, isLiked) {
    console.log(isLiked);
    if (isLiked) {
      return this._deleteLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResp(res));
  }
}

const api = new Api({
  // baseUrl: "https://vecoweb22.nomoredomains.rocks",
  baseUrl: "https://api.vecoweb22.nomoredomains.rocks",
  // baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
