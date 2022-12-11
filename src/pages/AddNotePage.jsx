import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import AddNotePageFormInput from "../components/AddNotePageFormInput";

function AddNotePage() {
  const navigate = useNavigate();

  const onAddNoteHandler = async (note) => {
    await addNote(note);
    navigate("/");
  };

  return (
    <div className="add-new-page">
      <AddNotePageFormInput addNote={onAddNoteHandler} />
    </div>
  );
}

export default AddNotePage;
