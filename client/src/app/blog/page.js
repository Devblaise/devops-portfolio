"use client";

import { useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([
    { id: 1, title: "My DevOps Journey Begins", content: "Day 1: I containerized my first app!" },
    { id: 2, title: "Terraforming the Cloud", content: "Learning to spin up AWS infra as code." },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      content: newContent,
    };
    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
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
          </div>
        ))}
      </div>
    </main>
  );
}
