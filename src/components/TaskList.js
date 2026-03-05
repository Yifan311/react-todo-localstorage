import TaskItem from "./TaskItem";
function TaskList({
  taskList,
  editTask,
  deleteTask,
  clearAll,
  checkTask,
  visibleTasks,
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
    </div>
  );
}
export default TaskList;
