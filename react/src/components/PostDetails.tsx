export default function PostDetails({ post }) {
    /* Single Responsibility for this Component:
        - Show the Details of a Post
    */
    return (
        <div className="border-2 rounded border-gray-300 p-4 mb-4 hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-2 underline">{post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}
