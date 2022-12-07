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
      if (newRequest) {
        return newRequest;
      } else {
        alert(
          JSON.stringify([
            { Error: newRequest.message },
            { Message: newRequest.response.data.message },
          ])
        );
      }
    } catch (error) {}
  }

  async get(id) {
    const request = await this.axiosInstance.get(
      `/galleries/${id}`,
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
        {
          brand: request.brand,
          engine: request.engine,
          is_automatic: request.is_automatic,
          max_speed: request.max_speed,
          model: request.model,
          number_of_doors: request.number_of_doors,
          year: request.year,
        },
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

  async getAuthorGalleries(params) {
    const request = await this.axiosInstance.get(
      "/my-galleries",
      { params },
      this.headers
    );

    return request;
  }
}

export default new GalleriesService();
