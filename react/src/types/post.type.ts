// Using ZOD & Typescript for schema validation
// Defining the schema for a Post, You can do it inside types file also for better code management
// Read zod docs for more details or types
/*
  - Use camelCase for runtime values (Zod schema constants).
  - Use PascalCase for TypeScript types/interfaces
*/

import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters long" }),
  body: z
    .string()
    .min(10, { message: "Body should be at least 10 characters long" }),
});
// Inferred Type (This is how zod and TS should be used)
export type CreatePostInput = z.infer<typeof createPostSchema>;
