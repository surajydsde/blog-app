import { useEffect, useState } from "react";
import API from "../services/api"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await API.get('/posts');
    setPosts(res.data);
  }

  const deletePost = async(id) => {
    if (!window.confirm("Delete this post?")) return;
    await API.delete(`/posts/${id}`);
    fetchPosts();
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div>
      { posts.length > 0 && <h2>All Posts</h2>}
      {posts.length > 0 ? posts.map(post => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <h5>{post.title}</h5>
            <p>{post.content}</p>
            <small>Author: {post.author?.name}</small>
            {user && post.author?._id === user._id && (
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deletePost(post._id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      )) : <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
    </div>
  )
}

export default Home