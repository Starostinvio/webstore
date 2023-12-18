import StoreModule from "../module";

class Authentication extends StoreModule {
  initState() {
    return {
      baseUrl: "/api/v1/users",
      waiting: false,
      serverError: "",
      sessionActive: false,
    };
  }

  getToken() {
    return window.localStorage.getItem("token");
  }
  setToken(token) {
    window.localStorage.setItem("token", token);
    this.setState({
      ...this.getState(),
    });
  }

  async removeToken() {
    try {
      const token = this.getToken();
      if (!token) throw new Error("Token not fined");

      const response = await fetch(`${this.getState().baseUrl}/sign`, {
        method: "DELETE",
        headers: { "X-Token": token, "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete token");
      }
      const data = await response.json();

      window.localStorage.removeItem("token");

      this.setState({
        ...this.getState(),

        userProfile: null,
        sessionActive: false,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),

        userProfile: null,
        sessionActive: false,
      });
    }
  }

  cleanServerError() {
    this.setState({
      ...this.getState(),
      serverError: "",
    });
  }

  async makeAuthenticatedRequest() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("token not fined");
      }

      const response = await fetch(`${this.getState().baseUrl}/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("token not fined");
      }
      const data = await response.json();

      this.setState({
        ...this.getState(),

        userProfile: {
          userName: data.result.profile.name,
          phone: data.result.profile.phone,
          email: data.result.email,
        },
        sessionActive: true,
      });

      return true;
    } catch (e) {
      this.setState({
        ...this.getState(),

        sessionActive: false,
      });

      return false;
    }
  }

  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
      serverError: "",
    });
    try {
      const response = await fetch(
        `${this.getState().baseUrl}/sign?fields=_id%2Cprofile%28name%29`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(errorText);
      }

      const data = await response.json();

      this.setToken(data.result.token);
      this.setState({
        ...this.getState(),

        sessionActive: true,
      });
    } catch (e) {
      const errorObj = JSON.parse(e.message);
      this.setState({
        ...this.getState(),
        serverError: errorObj.error.data.issues[0].message,
      });
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default Authentication;
