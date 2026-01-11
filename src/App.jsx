
import { useEffect, useState } from "react"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"



function App() {
  const [todos, setTodos] = useState([])


  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL)
    async function getTodos() {
      try {
        const res = await fetch(`/api/todo`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        setTodos(data)
      } catch (err) {
        console.error("Error updating todo:", err);
      }
    }
    getTodos()
  }, [])


  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo) => (
            <div key={todo._id}
              className="w-full"
            >
              <TodoList todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
