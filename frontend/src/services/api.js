import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = async (credentials) => {
  const response = await api.post("/admin/login", credentials);
  return response.data;
};

export const getStandings = async () => {
  const response = await api.get("/public/standings");
  return response.data;
};

export const getGames = async () => {
  const response = await api.get("/public/games");
  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await api.post("/admin/teams", teamData);
  return response.data;
};

export const updateTeam = async (id, teamData) => {
  const response = await api.put(`/admin/teams/${id}`, teamData);
  return response.data;
};

export const createGame = async (gameData) => {
  const response = await api.post("/admin/games", gameData);
  return response.data;
};
