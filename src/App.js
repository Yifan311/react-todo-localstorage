import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [inputText, setInputText] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const visibleTasks = taskList.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });
  const taskInput = (e) => {
    setInputText(e.target.value);
  };

  const addTask = () => {
    const text = inputText.trim();
    if (!text) return;
    if (editingId) {
      setTaskList((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, text } : t)),
      );
      setEditingId(null);
      setInputText("");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: inputText,
      done: false,
    };
    setTaskList((prev) => [...prev, newTask]);
    setInputText("");
  };

  const validInput = inputText.trim().length > 0;

  const deleteTask = (taskId) => {
    setTaskList((prev) => prev.filter((task) => task.id !== taskId));
  };

  const clearAll = () => {
    setTaskList([]);
  };

  const [editingId, setEditingId] = useState(null);
  const editTask = (taskId) => {
    const task = taskList.find((task) => task.id === taskId);
    if (!task) return;
    setInputText(task.text);
    setEditingId(taskId);
  };
  const checkTask = (taskId) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    );
  };

  const remainingTasks = taskList.filter((task) => !task.done).length;

  const clearCompleted = () => {
    setTaskList((prev) => prev.filter((task) => !task.done));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputText}
          placeholder="Enter a task"
          onChange={taskInput}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button disabled={!validInput} onClick={addTask}>
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>
      <TaskList
        taskList={taskList}
        editTask={editTask}
        deleteTask={deleteTask}
        clearAll={clearAll}
        checkTask={checkTask}
        visibleTasks={visibleTasks}
        remainingTasks={remainingTasks}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}

export default App;
