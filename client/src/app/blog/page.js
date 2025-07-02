"use client";

import { useState, useEffect } from "react";

const API_URL = 'http://localhost:4000/posts';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Fetch posts once on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
          console.error("API did not return an array:", data);
        }
      })
      .catch((err) => {
        setPosts([]);
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  // Add new post
  const addPost = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  // Delete post
  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setPosts(posts.filter(post => post.id !== id));
    } else {
      console.error('Failed to delete post');
    }
  };

  // Start editing
  const startEditing = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    if (response.ok) {
      const updated = await response.json();
      setPosts(posts.map(post => post.id === editingId ? updated : post));
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
    } else {
      console.error("Failed to update post");
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
            {editingId === post.id ? (
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
                <textarea
                  className="w-full p-2 border rounded"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    💾 Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => setEditingId(null)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => startEditing(post)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(post.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
