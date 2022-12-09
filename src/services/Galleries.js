import { httpService } from "./HttpService";

class GalleriesService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.headers = {
      headers: {
        Authorisation: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  async getAll(params) {
    const response = await this.axiosInstance.get(
      "/galleries",
      { params },
      this.headers
    );

    return response.data;
  }

  async add(request) {
    try {
      const newRequest = await this.axiosInstance.post(
        "/create",
        request,
        this.headers
      );
      if (newRequest.status === 200) {
        return newRequest;
      } else {
        alert(
          JSON.stringify([
            { Error: newRequest.message },
            { Message: newRequest.response.data.errors },
          ])
        );
      }
    } catch (error) {}
  }

  async get(id) {
    const request = await this.axiosInstance.get(
      `/gallery/${id}`,
      this.headers
    );
    if (request) {
      return request.data;
    }
  }

  async edit(id, request) {
    try {
      const newRequest = await this.axiosInstance.patch(
        `edit-gallery/${id}`,
        {},
        this.headers
      );

      return newRequest;
    } catch (error) {
      alert(
        JSON.stringify([
          { Error: error.message },
          { Message: error.response.data.message },
        ])
      );
    }
  }

  async delete(id) {
    const request = await this.axiosInstance.delete(
      `/delete-gallery/${id}`,
      this.headers
    );

    return request;
  }

  async getMyGalleries(params) {
    const request = await this.axiosInstance.get(
      "/my-galleries",
      { params },
      this.headers
    );

    return request;
  }

  async getAuthorsGalleries(params, id) {
    const request = await this.axiosInstance.get(
      `/authors/${id}`,
      { params },
      this.headers
    );
    console.log(params);

    return request;
  }
}

export default new GalleriesService();
