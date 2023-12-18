import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      baseUrl: "/api/v1/users",
      waiting: false,
      userData: {
        token: "",
        userName: "",
        phone: "",
        email: "",
      },
    };
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  async makeProfileRequest() {
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
        throw new Error("User not find");
      }
      const data = await response.json();

      this.setState({
        ...this.getState(),

        userData: {
          token: this.getToken(),
          userName: data.result.profile.name,
          phone: data.result.profile.phone,
          email: data.result.email,
        },
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
      });
    }
  }
}

export default Profile;
