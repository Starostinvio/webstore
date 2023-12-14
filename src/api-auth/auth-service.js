class AuthService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  //http://example.front.ylab.io/api/v1/users/sign baseUrl

  getToken() {
    localStorage.getItem("token");
  }
  setToken(token) {
    localStorage.setItem("token", token);
  }

  async login(username, password) {
    const response = await fetch(
      "http://example.front.ylab.io/api/v1/users/sign?fields=_id%2Cprofile%28name%29",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    this.setToken(data.result.token);
  }
}

export { AuthService };
