import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWM2MWZlNTUxYWZhYzQxYTdiZDQ5YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODIzNzg2NCwiZXhwIjoxNjQ4NDk3MDY0fQ.9I_DtBS4lgb0-dLq_TBlHd7hbscTSf_cEiN1J8qXgPM";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
