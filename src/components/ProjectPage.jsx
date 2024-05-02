export default function ProjectPage({ onAddProject }) {
  return (
    <>
      <h2 className="text-2xl font-semibold">No Project Selected</h2>
      <p className="mt-4">Select a project or get started with a new one</p>
      <button
        onClick={onAddProject}
        className="text-white rounded bg-gray-800 p-2 mt-8"
      >
        Create new project
      </button>
    </>
  );
}
