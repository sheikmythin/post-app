import { useEffect, useState } from "react";
import "./postDetail.css";

function PostDetails({ postId, goBack }) {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );

      if (!postResponse.ok) {
        throw new Error("Failed to fetch post");
      }

      const postData = await postResponse.json();
      setPost(postData);

      const [userResponse, commentsResponse] = await Promise.all([
        fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        ),
        fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        ),
      ]);

      if (!userResponse.ok || !commentsResponse.ok) {
        throw new Error("Failed to fetch additional data");
      }

      const userData = await userResponse.json();
      const commentsData = await commentsResponse.json();

      setUser(userData);
      setComments(commentsData);
    } catch (error) {
      setError("Unable to load post details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [postId]);
if (loading) {
  return (
    <div className="loading-page">
      <div className="loader"></div>
      <p>Loading post details...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <p>{error}</p>
      <button className="back-button" onClick={goBack}>
        ← Back to Posts
      </button>
    </div>
  );
}

  return (
    <div className="details-page">

      <div className="details-container">

        <button className="back-button" onClick={goBack}>
          ← Back to Posts
        </button>

        {post && (
          <article className="post-details-card">

            <div className="post-tag">
              POST #{post.id}
            </div>

            <h1>{post.title}</h1>

            <p className="post-content">
              {post.body}
            </p>

            {user && (
              <div className="author-box">

                <div className="author-avatar">
                  {user.name.charAt(0)}
                </div>

                <div>
                  <span>Written by</span>
                  <strong>{user.name}</strong>
                </div>

              </div>
            )}

          </article>
        )}

        {user && (
          <section className="user-section">

            <h2>About the Author</h2>

            <div className="user-card">

              <div className="large-avatar">
                {user.name.charAt(0)}
              </div>

              <div className="user-info">
                <h3>{user.name}</h3>
                <p>✉ {user.email}</p>
                <p>☎ {user.phone}</p>
                <p>🌐 {user.website}</p>
              </div>

            </div>

          </section>
        )}

        <section className="comments-section">

          <div className="comments-heading">
            <h2>Comments</h2>
            <span>{comments.length}</span>
          </div>

         {comments.length === 0 ? (
  <p className="no-comments">No comments yet.</p>
) : (
  comments.map((comment) => (
    <div className="comment-card" key={comment.id}>
      <div className="comment-avatar">
        {comment.name.charAt(0)}
      </div>

      <div className="comment-content">
        <h3>{comment.name}</h3>
        <p className="comment-email">{comment.email}</p>
        <p>{comment.body}</p>
      </div>
    </div>
  ))
)}

        </section>

      </div>

    </div>
  );
}

export default PostDetails;