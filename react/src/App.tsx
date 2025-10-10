import "./App.css";
import { usePosts } from "./hooks/usePosts";

function App() {
  const { data: posts, loading, error } = usePosts();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Data Error</div>;
  return (
    <>
      <h1>Posts</h1>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
