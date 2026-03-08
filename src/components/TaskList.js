import TaskItem from "./TaskItem";
function TaskList({
  taskList,
  editTask,
  deleteTask,
  clearAll,
  checkTask,
  visibleTasks,
  remainingTasks,
  clearCompleted,
}) {
  return (
    <div>
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
            checkTask={checkTask}
          />
        ))}
      </ul>
      {taskList.length > 0 && (
        <button onClick={clearAll} className="clearAll">
          Clear all
        </button>
      )}
      {taskList.filter((task) => task.done).length > 0 && (
        <button onClick={clearCompleted} className="clearCompleted">
          Clear Completed
        </button>
      )}

      <p>{remainingTasks} tasks left</p>
    </div>
  );
}
export default TaskList;
