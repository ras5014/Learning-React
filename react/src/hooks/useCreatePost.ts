import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/post.api";
import type { CreatePostInput } from "../types/post.type";
import toast from "react-hot-toast";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
    onSuccess: () => {
      // After creating a post, we want to refetch the posts list to include the new post
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create post");
    },
  });
};
