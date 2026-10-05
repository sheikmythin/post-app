import { useEffect, useState } from "react";
import useStore from "./store";
import "./Home.css";

function Home({ openPost }) {
  const { posts, users, setPosts, setUsers } = useStore();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [postsResponse, usersResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        setError("Unable to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setPosts, setUsers]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
  setCurrentPage(1);
}, [search]);
   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

const startIndex = (currentPage - 1) * postsPerPage;

const currentPosts = filteredPosts.slice(
  startIndex,
  startIndex + postsPerPage
);
  if (loading) {
    return (
      <div className="loading-page">
        <div className="loader"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-page">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home">

      <header className="header">
        <div className="header-content">
         <h1 className="app-title">
  Post<span>Hub</span>
</h1>

<p className="app-subtitle">
  Discover, explore and share interesting posts
</p>
        </div>
      </header>

      <main className="container">

        <div className="search-section">
          <h2>Explore Posts</h2>

          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <p className="result-count">
            {filteredPosts.length} posts found
          </p>
        </div>

        <div className="posts-grid">
          {currentPosts.map((post) => {

            const user = users.find(
              (user) => user.id === post.userId
            );
            

            return (
              <article className="post-card" key={post.id}>

                <div className="post-number">
                  Post #{post.id}
                </div>

                <h2>{post.title}</h2>

                <p className="post-body">
                  {post.body}
                </p>

                <div className="post-footer">

                  <div className="author">
                    <div className="avatar">
                      {user?.name?.charAt(0)}
                    </div>

                    <div>
                      <span>Written by</span>
                      <strong>
                        {user?.name || "Unknown User"}
                      </strong>
                    </div>
                  </div>
                 
                  <button
                    className="read-button"
                    onClick={() => openPost(post.id)}
                  >
                    Read More →
                  </button>

                </div>

              </article>
            );
          })}
        </div>

        {filteredPosts.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
        {filteredPosts.length === 0 && (
          <div className="no-results">
           
            <h2>No posts found</h2>
            <p>Try searching with a different keyword.</p>
          </div>
        )}

      </main>

    </div>
  );
}

export default Home;