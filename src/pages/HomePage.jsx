import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "../contexts/LanguageContext";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/network-data";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import NotesList from "../components/notes/NotesList";

const HomePage = () => {
  const { t } = useLanguage();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);

    try {
      const notesData = await getActiveNotes();
      setNotes(notesData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
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

  const handleArchive = async (noteId) => {
    setActionLoading(true);

    try {
      await archiveNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
      toast.success(t("noteArchived"));
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("activeNotes")}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your notes</p>
        </div>

        <NotesList notes={notes} loading={loading} actionLoading={actionLoading} onDelete={handleDelete} onArchive={handleArchive} emptyMessage={t("noActiveNotes")} showAddButton={true} />
      </main>
    </div>
  );
};

export default HomePage;
