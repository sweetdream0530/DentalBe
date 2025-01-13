import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/'
    }
    return Promise.reject(error);
  }
);


export default API;

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const fetchNotes = () => API.get("/notes/");
export const createNote = (data) => API.post("/notes/", data);
export const updateNote = (id, data) => API.put(`/notes/${id}/`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}/`);
export const getNoteById = (id) => API.get(`/notes/${id}/`);
export const uploadAudio = (noteId, audioFile) => {
  const formData = new FormData();
  formData.append("audio", audioFile);
  return API.post(`/notes/${noteId}/audio/`, formData);
};
