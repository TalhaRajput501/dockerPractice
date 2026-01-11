import React, { useState } from "react";

function TodoList({ todo,  }) {
  const [editAble, setEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.message);
  const [loading, setLoading] = useState(false);
 
  // Toggle status status
  const togglestatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/todo/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !todo.status }),
      });
      const data = await res.json(); 
    } catch (err) {
      console.error("Error updating todo:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save edited todo
  const editTodo = async () => {
    if (!todoMsg.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/todo/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: todoMsg }),
      });
      const data = await res.json(); 
      setEditable(false);
    } catch (err) {
      console.error("Error editing todo:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async () => {
    try {
      setLoading(true);
      await fetch(`/api/todo/${todo._id}`, {
        method: "DELETE",
      }); 
    } catch (err) {
      console.error("Error deleting todo:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.status ? "bg-[#e98e6a]" : "bg-[#c6e9a7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.status}
        onChange={togglestatus}
        disabled={loading}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          editAble ? "border-black px-2" : "border-transparent"
        } ${todo.status ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!editAble}
      />
      {/* Edit / Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.status) return;
          if (editAble) {
            editTodo();
          } else setEditable(true);
        }}
        disabled={loading || todo.status}
      >
        {editAble ? "💾" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={deleteTodo}
        disabled={loading}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoList;
