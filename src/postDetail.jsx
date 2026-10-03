import { useEffect, useState } from "react";

function PostDetails({ postId, goBack }) {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);

        fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
          .then((response) => response.json())
          .then((userData) => setUser(userData));
      });

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId]);

  return (
    <div>
      <button onClick={goBack}>Back</button>

      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}

      {user && (
        <>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </>
      )}

      <h2>Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
          <p>{comment.email}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetails;