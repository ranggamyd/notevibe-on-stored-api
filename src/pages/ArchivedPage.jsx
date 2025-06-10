import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "../contexts/LanguageContext";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/network-data";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import NotesList from "../components/notes/NotesList";

const ArchivedPage = () => {
  const { t } = useLanguage();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchArchivedNotes = async () => {
    setLoading(true);

    try {
      const notesData = await getArchivedNotes();
      setNotes(notesData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const handleDelete = async (noteId) => {
    setActionLoading(true);

    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
      toast.success(t("noteDeleted"));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnarchive = async (noteId) => {
    setActionLoading(true);

    try {
      await unarchiveNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
      toast.success(t("noteUnarchived"));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("archivedNotes")}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Your archived notes</p>
        </div>

        <NotesList notes={notes} loading={loading} actionLoading={actionLoading} onDelete={handleDelete} onUnarchive={handleUnarchive} emptyMessage={t("noArchivedNotes")} />
      </main>
    </div>
  );
};

export default ArchivedPage;
