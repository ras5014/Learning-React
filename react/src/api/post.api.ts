import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type FormData = {
  title: string;
  body: string;
};

export const createPost = async (data: FormData) => {
  const response = await axios.post(API_URL, data);
  //   throw new Error("Failed to create post"); // For testing error handling
  return response.data;
};
