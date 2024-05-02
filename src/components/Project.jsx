import { useRef } from "react";

export default function Project({
  project,
  onDeleteTask,
  onUpdateTask,
  onDeleteProject,
}) {
  const newTask = useRef();

  function handleAddTaskClick() {
    onUpdateTask(newTask.current.value, project.index);
  }
  function handleClearTaskClick(index) {
    onDeleteTask(index, project.index);
  }

  function handleDeleteProjectClick(index) {
    onDeleteProject(index);
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold">{project.title}</h1>
        <button onClick={() => handleDeleteProjectClick(project.index)}>
          Delete
        </button>
      </div>
      <p>{project.dueDate}</p>
      <p className="mt-5">{project.description}</p>
      <hr className="mt-5 border-2" />
      <h1 className="mt-5 font-bold">Tasks</h1>
      <input ref={newTask} className="bg-gray-50 mt-3 mr-3" type="text" />
      <button onClick={handleAddTaskClick}>Add Task</button>
      {project.tasks.length > 0 && (
        <div className="bg-gray-200 p-7 mt-5 rounded-lg">
          {project.tasks.map((task, taskIndex) => {
            return (
              <div
                key={task + taskIndex}
                className="flex justify-between mt-3 mb-5"
              >
                <p>{task}</p>
                <button onClick={() => handleClearTaskClick(taskIndex)}>
                  Clear
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
