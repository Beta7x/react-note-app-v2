import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import AddNewPageInput from "../components/AddNewPageInput";

function AddNewPage() {
  const navigate = useNavigate();

  const onAddNoteHandler = async (note) => {
    await addNote(note);
    navigate("/");
  };

  return (
    <div className="add-new-page">
      <AddNewPageInput addNote={onAddNoteHandler} />
    </div>
  );
}

export default AddNewPage;
