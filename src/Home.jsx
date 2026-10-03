import { useEffect, useState } from "react";
import useStore from "./store";

function Home() {
  const { posts, users, setPosts, setUsers } = useStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [setPosts, setUsers]);

  return (
    <div>
      <h1>Posts Application</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
        )
        .map((post) => {
          const user = users.find((user) => user.id === post.userId);

          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>Author: {user?.name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Home;