import { httpService } from "./HttpService";

class CommentsService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.headers = {
      headers: {
        Authorisation: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  async getAll(id) {
    const response = await this.axiosInstance.get(
      `gallery/${id}/comments`,
      this.headers
    );

    return response.data;
  }

  async add(request) {
    try {
      const newRequest = await this.axiosInstance.post(
        `/gallery/${request.id}/comments`,
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
}

export default new CommentsService();
