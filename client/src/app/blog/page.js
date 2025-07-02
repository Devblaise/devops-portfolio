"use client";

import { useState, useEffect } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const API_URL = "http://localhost:4000/posts";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const addPost = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });

    if (response.ok) {
      const created = await response.json();
      setPosts([created, ...posts]);
      setNewTitle("");
      setNewContent("");
    } else {
      console.error("Post creation failed");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">📝 Blog</h1>

      <div className="mb-6">
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="New post title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="New post content"
          rows={4}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={addPost}
        >
          ➕ Add Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
