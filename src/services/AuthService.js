import { httpService } from "./HttpService";
import axios from "axios";

class AuthService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.setAxiosAuthorisationHeader();
    this.refreshed = false;
    this.runInterceptor();
  }

  runInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401 && this.refreshed === false) {
          this.refreshed = true;
          const response = await this.refresh();

          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            this.setAxiosAuthorisationHeader(response.data.token);
            window.location.reload();

            return axios(error.config);
          }
        }

        this.refreshed = false;
        return error;
      }
    );
  }

  setAxiosAuthorisationHeader(tokenParam = null) {
    try {
      let token = tokenParam ? tokenParam : localStorage.getItem("token");
      if (token) {
        this.axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    } catch (error) {}
  }

  async register(data) {
    try {
      let response = await this.axiosInstance.post("/register", data);
      if (response.data) {
        localStorage.setItem("token", response.data.authorisation.token);
        this.setAxiosAuthorisationHeader(response.data.authorisation.token);
        return response;
      } else {
        alert(
          JSON.stringify([
            { Error: response.message },
            { Message: response.response.data.message },
          ])
        );
      }
    } catch (error) {}
  }

  async login(data) {
    try {
      let response = await this.axiosInstance.post("/login", data);
      if (response.data) {
        localStorage.setItem("token", response.data.authorisation.token);
        this.setAxiosAuthorisationHeader(response.data.authorisation.token);
        return response;
      } else {
        alert(
          JSON.stringify([
            { Error: response.message },
            { Message: response.response.data.message },
          ])
        );
      }
    } catch (error) {
      alert(
        JSON.stringify([
          { Error: error.message },
          { Message: error.response.data.message },
        ])
      );
    }
  }

  async logout() {
    try {
      const response = await this.axiosInstance.post("/logout");
      localStorage.removeItem("token");
      window.location.reload();
      return response;
    } catch (error) {}
  }

  async refresh() {
    try {
      let response = await this.axiosInstance.post("/refresh");
      if (response.data) {
        return response;
      }
    } catch (error) {}
  }

  async me() {
    try {
      let response = await this.axiosInstance.get("/me");
      if (response) {
        return response;
      }
    } catch (error) {}
  }
}

export const authService = new AuthService();
