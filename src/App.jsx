import ProjectForm from "./components/ProjectForm.jsx";
import ProjectPage from "./components/ProjectPage.jsx";
import Project from "./components/Project.jsx";
import { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedPage, setSelectedPage] = useState("No project selected");
  const [currentProject, setCurrentProject] = useState({});

  function handleAddProjectClick() {
    setSelectedPage("Add project");
  }

  function saveProject(title, description, dueDate) {
    setProjects((prevProjects) => {
      const updateProjects = [
        ...prevProjects,
        {
          title: title,
          description: description,
          dueDate: dueDate,
          tasks: [],
        },
      ];

      setSelectedPage("Project");
      setCurrentProject({
        index: updateProjects.length - 1,
        title: updateProjects[updateProjects.length - 1].title,
        description: updateProjects[updateProjects.length - 1].description,
        dueDate: updateProjects[updateProjects.length - 1].dueDate,
        tasks: updateProjects[updateProjects.length - 1].tasks,
      });

      return updateProjects;
    });
  }

  function updateTasks(newTask) {
    setProjects((prevProjects) => {
      const updateProject = [...prevProjects];

      updateProject[currentProject.index].tasks.push(newTask);

      return updateProject;
    });
  }

  function handleOpenProjectClick(index) {
    setCurrentProject(() => {
      const updateCurrentProject = { ...projects[index], index: index };

      return updateCurrentProject;
    });
    setSelectedPage("Project");
  }

  function handleRemoveTask(index) {
    setProjects((prevProjects) => {
      const updateProject = [...prevProjects];

      updateProject[currentProject.index].tasks.splice(index, 1);

      return updateProject;
    });
  }

  function deleteProject(index) {
    setProjects((prevProjects) => {
      const updateProjects = [...prevProjects];
      updateProjects.splice(index, 1);

      return updateProjects;
    });
    setSelectedPage("No project selected");
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-950 text-white p-5">
        <h1 className="text-lg font-bold uppercase">Your projects</h1>
        <button
          className="rounded bg-neutral-700 p-2 mt-8"
          onClick={handleAddProjectClick}
        >
          + Add Project
        </button>
        <ol className="mt-7">
          {projects.map((item, index) => (
            <li key={item.title} className="rounded p-2 mt-3 bg-stone-800">
              <button onClick={() => handleOpenProjectClick(index)}>
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex-1 p-10 bg-white">
        {selectedPage === "Add project" && (
          <ProjectForm
            onSaveClick={saveProject}
            onCancelClick={setSelectedPage}
          />
        )}
        {selectedPage === "No project selected" && <ProjectPage />}
        {selectedPage === "Project" && (
          <Project
            currentProject={currentProject}
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
