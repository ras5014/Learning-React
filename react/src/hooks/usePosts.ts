import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";

// 1. Define the Data Type here or in the global/local types file
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const usePosts = () => {
  const { data, isPending, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return { data, isPending, isError };
};
