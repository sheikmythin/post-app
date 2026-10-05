import { useState } from "react";
import Home from "./Home";
import PostDetails from "./postDetail";


function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  if (selectedPostId) {
    return (
      <PostDetails
        postId={selectedPostId}
        goBack={() => setSelectedPostId(null)}
      />
    );
  }

  return (
    <Home
      openPost={(postId) => setSelectedPostId(postId)}
    />
  );
}

export default App;