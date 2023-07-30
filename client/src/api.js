import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend server URL
});

export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

export default {
  postData: postData,
};
