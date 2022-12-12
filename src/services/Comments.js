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

    return response;
  }

  async add(id, newComment) {
    try {
      const newRequest = await this.axiosInstance.post(
        `/gallery/${id}/comments`,
        newComment,
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

  async delete(gId, cId) {
    const request = await this.axiosInstance.delete(
      `/gallery/${gId}/comments/${cId}`,
      this.headers
    );

    return request;
  }
}

export default new CommentsService();
