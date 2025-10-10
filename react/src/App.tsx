import './App.css'
import { usePosts } from './hooks/usePosts'

function App() {

  const { data: posts, isPending, isError } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error fetching posts</div>}
      <div className="post-container">
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
