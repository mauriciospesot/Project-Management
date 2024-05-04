import NewProjectForm from "./components/NewProjectForm.jsx";
import Home from "./components/Home.jsx";
import Project from "./components/Project.jsx";
import { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedPage, setSelectedPage] = useState("No project selected");
  const [currentProjectIndex, setCurrentProjectIndex] = useState();

  function handleAddProjectClick() {
    setSelectedPage("Add project");
  }

  function saveProject(title, description, dueDate) {
    setProjects((prevProjects) => {
      const index = prevProjects.length === 0 ? 0 : prevProjects.length;
      const updateProjects = [
        ...prevProjects,
        {
          index: index,
          title: title,
          description: description,
          dueDate: dueDate,
          tasks: [],
        },
      ];

      setSelectedPage("Project");
      setCurrentProjectIndex(updateProjects.length - 1);

      return updateProjects;
    });
  }

  function updateTasks(newTask, projectIndex) {
    setProjects((prevProjects) => {
      const updateProject = [...prevProjects];

      updateProject[projectIndex].tasks.push(newTask);

      return updateProject;
    });
  }

  function handleOpenProjectClick(index) {
    setCurrentProjectIndex(index);
    setSelectedPage("Project");
  }

  function handleRemoveTask(index, projectIndex) {
    setProjects((prevProjects) => {
      const updateProject = [...prevProjects];
      updateProject[projectIndex].tasks.splice(index, 1);

      return updateProject;
    });
  }

  function deleteProject(index) {
    setProjects((prevProjects) => {
      const updateProjects = [...prevProjects];
      updateProjects.splice(index, 1);
      updateProjects.map((project) => {
        project.index = project.index !== 0 ? project.index - 1 : 0;
      });

      return updateProjects;
    });
    setSelectedPage("No project selected");
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-950  p-5">
        <h1 className="text-lg font-bold uppercase text-stone-200">
          Your projects
        </h1>
        <button
          className="rounded bg-stone-700 text-stone-400 px-4 py-2 text-xs mt-8 hover:bg-stone-600 hover:text-stone-100"
          onClick={handleAddProjectClick}
        >
          + Add Project
        </button>
        <ol className="mt-7">
          {projects.map((item, index) => (
            <li key={item.title}>
              <button
                className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
                onClick={() => handleOpenProjectClick(index)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex-1 p-10 bg-white">
        {selectedPage === "Add project" && (
          <NewProjectForm
            onSaveClick={saveProject}
            onCancelClick={setSelectedPage}
          />
        )}
        {selectedPage === "No project selected" && (
          <Home onAddProject={handleAddProjectClick} />
        )}
        {selectedPage === "Project" && (
          <Project
            project={projects[currentProjectIndex]}
            onUpdateTask={updateTasks}
            onDeleteTask={handleRemoveTask}
            onDeleteProject={deleteProject}
          />
        )}
      </div>
    </div>
  );
}

export default App;
