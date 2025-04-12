// services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Replace with your actual backend URL

// Upload a CAD file
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/files/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get all blocks with pagination, search, filter
export const getBlocks = async ({
  page = 1,
  limit = 10,
  name = "",
  type = "",
  layer = "",
  file_id = "",
  showProperties = false,
}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (name) params.append("name", name);
  if (type) params.append("type", type);
  if (layer) params.append("layer", layer);
  if (file_id) params.append("file_id", file_id);
  if (showProperties) params.append("showProperties", "true");

  const response = await axios.get(`${API_BASE_URL}/blocks?${params.toString()}`);
  return response.data;
};

// Get a single block by ID
export const getBlockById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/blocks/${id}`);
  return response.data;
};
