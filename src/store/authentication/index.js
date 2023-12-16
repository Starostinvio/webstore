import StoreModule from "../module";

class Authentication extends StoreModule {
  initState() {
    return {
      baseUrl: "/api/v1/users",
      waiting: false,
      serverError: "",
      token: "",
    };
  }

  getToken() {
    return window.localStorage.getItem("token");
  }
  setToken(token) {
    window.localStorage.setItem("token", token);
    this.setState({
      ...this.getState(),
      token: token,
    });
  }

  removeToken() {
    window.localStorage.removeItem("token");
    this.setState({
      ...this.getState(),
      token: "",
      userProfile: null,
    });
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
        throw new Error("token undefined");
      }
      // http://example.front.ylab.io/api/v1/users/self?fields=_id%2Cemail%2Cprofile%28name%29

      const response = await fetch(`${this.getState().baseUrl}/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("token undefined");
      }
      const data = await response.json();

      this.setState({
        ...this.getState(),
        token: this.getToken(),
        userProfile: {
          userName: data.result.profile.name,
          phone: data.result.profile.phone,
          email: data.result.email,
        },
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        serverError: e,
      });
    }
  }

  async login(login, password) {
    console.log("login");
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
        token: data.result.token,
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
