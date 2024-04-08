import objectCleaner from "@/utils/objectCleaner";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

class UserService {
  constructor() {
    this.baseUrl = BASE_API_URL;
    this.authorizedHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  }

  async createUser(values) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectCleaner(values)),
      });

      console.table(res);
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(userId) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/users/${userId}`, {
        method: "GET",
        headers: this.authorizedHeaders,
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(userId, values) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(objectCleaner(values)),
        headers: this.authorizedHeaders,
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
