import { useState, useRef } from "react";

export default function ProjectForm({ onSaveClick, onCancelClick }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSaveClick() {
    onSaveClick(
      title.current.value,
      description.current.value,
      dueDate.current.value
    );
  }

  function handleCancelClick() {
    onCancelClick("No project selected");
  }

  return (
    <>
      <div className="flex flex-row-reverse">
        <button
          className="text-white rounded bg-gray-800 p-2 mt-8"
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button
          onClick={handleCancelClick}
          className="text-black rounded bg-white p-2 mt-8"
        >
          Cancel
        </button>
      </div>

      <div className="flex flex-col">
        <label className="uppercase font-bold text-slate-500" htmlFor="">
          Title
        </label>
        <input ref={title} className="bg-gray-50" type="text" />
      </div>
      <div className="flex flex-col">
        <label className="uppercase font-bold text-slate-500" htmlFor="">
          Description
        </label>
        <textarea ref={description} className="bg-gray-50" type="text" />
      </div>
      <div className="flex flex-col">
        <label className="uppercase font-bold text-slate-500" htmlFor="">
          Due date
        </label>
        <input ref={dueDate} className="bg-gray-50" type="date" />
      </div>
    </>
  );
}
