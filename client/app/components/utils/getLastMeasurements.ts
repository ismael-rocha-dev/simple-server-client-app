import axios, { AxiosResponse } from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { "Content-Type": "text/json" },
  });

  type MeasurementsData = {
    consumption_measurements: number[];
    date: string;
    generation_measurements: number[];
  };

export async function getLastMeasurements() {
    const response = await api.get<any, AxiosResponse<MeasurementsData>>("/");
  
    return response.data;
  }