import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts.api";

export const usePosts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
  return { data, isLoading, error };
};
