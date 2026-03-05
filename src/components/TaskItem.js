function TaskItem({ task, editTask, deleteTask, checkTask }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => checkTask(task.id)}
      />
      <span className={task.done ? "done" : ""}>{task.text}</span>
      <button onClick={() => editTask(task.id)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}
export default TaskItem;
