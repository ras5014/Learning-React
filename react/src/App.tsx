import PostList from "./components/PostList";
import { usePosts } from "./hooks/posts.hook";

function App() {
  /* Single Responsibility for this Component:
       - Get all posts using hooks
       - Show the Home Page (Handle Error and Loading States)
  */
  const { data, isLoading, error } = usePosts();
  return (
    <div className="text-center space-y-8">
      <h1 className="text-3xl font-bold">Posts</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching posts</p>}
      {data && data.length > 0 && (
        <PostList posts={data} />
      )}
      {data && data.length === 0 && <p>No posts found</p>}
    </div>
  );
}

export default App;
