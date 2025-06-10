import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLanguage } from "../contexts/LanguageContext";
import { addNote } from "../utils/network-data";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import NoteForm from "../components/notes/NoteForm";

const AddNotePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (noteData, resetForm) => {
    setLoading(true);

    try {
      await addNote(noteData);
      resetForm();
      toast.success(t("noteAdded"));
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("addNote")}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create a new note</p>
        </div>

        <NoteForm onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  );
};

export default AddNotePage;
