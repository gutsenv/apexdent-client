import objectCleaner from "@/utils/objectCleaner";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

class AppointmentService {
  constructor() {
    this.baseUrl = BASE_API_URL;
    this.authorizedHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  }

  async create(values) {
    const res = await fetch(`${this.baseUrl}/api/v1/appointments`, {
      method: "POST",
      headers: this.authorizedHeaders,
      body: JSON.stringify(values),
    });

    return res.json();
  }

  async getAll(userId) {
    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/appointments/patient/${userId}`,
        {
          method: "GET",
          headers: this.authorizedHeaders,
        }
      );

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getById(appointmentId) {
    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/appointments/${appointmentId}`,
        {
          method: "GET",
          headers: this.authorizedHeaders,
        }
      );

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(appointmentId, values) {
    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/appointments/${appointmentId}`,
        {
          method: "PATCH",
          headers: this.authorizedHeaders,
          body: JSON.stringify(objectCleaner(values)),
        }
      );

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async cancelById(appointmentId) {
    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/appointments/cancel/${appointmentId}`,
        {
          method: "PATCH",
          headers: this.authorizedHeaders,
        }
      );

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AppointmentService();
