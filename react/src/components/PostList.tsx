import PostDetails from './PostDetails'

export default function PostList({ posts }) {
    /* Single Responsibility for this Component:
        - Show the List of Posts in a Grid Layout
    */
    return (
        <div className='grid grid-cols-4 gap-6 m-8'>
            {
                posts.map(post => (
                    <PostDetails key={post.id} post={post} />
                ))
            }
        </div>
    )
}
