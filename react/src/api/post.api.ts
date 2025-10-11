import axios from "axios";
import type { CreatePostInput } from "../types/post.type";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const createPost = async (data: CreatePostInput) => {
  const response = await axios.post(API_URL, data);
  //   throw new Error("Failed to create post");
  return response.data;
};
