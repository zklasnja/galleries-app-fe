import { httpService } from "./HttpService";

class ImagesService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.headers = {
      headers: {
        Authorisation: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  async add(request) {
    try {
      const newRequest = await this.axiosInstance.post(
        "/add-image",
        request,
        this.headers
      );
      if (newRequest.response.status === 200) {
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

  async delete(id) {
    const request = await this.axiosInstance.delete(
      `/delete-image/${id}`,
      this.headers
    );
    return request;
  }
}

export default new ImagesService();
