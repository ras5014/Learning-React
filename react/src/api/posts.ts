/* 
  1. Only handle api calls related to posts here
  2. You can make axios instance instead of using axios directly
*/
import axios from "axios";

export const getPosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};
