import React, { useState } from "react";

function TodoForm({ onNewTodo }) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const add = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return; // don't allow empty todos

    setLoading(true);
    try {
      // Make POST request to backend
      const res = await fetch("http://localhost/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add todo");
      }

      const data = await res.json(); // this contains { message: ..., todo: {...} }
      console.log("Added todo:", data);

      // // Call parent callback to update todo list (optional)
      // if (onNewTodo) onNewTodo(data.todo);

      // Reset input field
      setMsg("");
    } catch (error) {
      console.error("Error adding todo:", error.message);
      alert("Failed to add todo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        disabled={loading}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default TodoForm;
