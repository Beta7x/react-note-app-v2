import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailNotePageAction from "../components/DetailNotePageAction";
import { showFormattedDate } from "../utils";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";
import NotFoundPage from "./NotFoundPage";

const DetailNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    navigate("/");
  };

  const onUnarchiveNoteHandler = async (id) => {
    await unarchiveNote(id);
    navigate("/");
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    navigate("/");
  };

  useEffect(() => {
    const fetchGetNotes = async () => {
      const { data } = await getNote(id);

      setNotes(data);
    };

    fetchGetNotes();
  }, [id]);

  return notes === undefined ? (
    <NotFoundPage />
  ) : (
    <section className="detail-page">
      <h3 className="detail-page__title">{notes.title}</h3>
      <p className="detail-page__createdAt">
        {showFormattedDate(notes.createdAt)}
      </p>
      <div className="detail-page__body">{notes.body}</div>
      <DetailNotePageAction
        id={notes.id}
        title={notes.title}
        archived={notes.archived}
        archiveNote={onArchiveHandler}
        unArchiveNote={onUnarchiveNoteHandler}
        deleteNote={onDeleteHandler}
      />
    </section>
  );
}

export default DetailNotePage;
