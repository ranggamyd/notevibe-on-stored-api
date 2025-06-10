import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Archive, ArchiveRestore, Trash2, ArrowLeft, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/network-data";
import { showFormattedDate, showFormattedDateEn } from "../utils";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ConfirmDialog from "../components/common/ConfirmDialog";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isIndonesian } = useLanguage();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);

  const formatDate = (date) => (isIndonesian ? showFormattedDate(date) : showFormattedDateEn(date));

  const fetchNote = async () => {
    setLoading(true);

    try {
      const noteData = await getNote(id);
      setNote(noteData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    setActionLoading(true);

    try {
      await deleteNote(id);
      toast.success(t("noteDeleted"));
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleArchiveToggle = async () => {
    setActionLoading(true);

    try {
      if (note.archived) {
        await unarchiveNote(id);
        toast.success(t("noteUnarchived"));
      } else {
        await archiveNote(id);
        toast.success(t("noteArchived"));
      }
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
      setShowArchiveDialog(false);
    }
  };

  loading && (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </main>
    </div>
  );

  !note && (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Trash2 className="w-12 h-12 text-red-400" />
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">Note not found</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notes
          </Button>
        </div>
      </main>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Navigation />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Notes</span>
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    {note?.archived && (
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Archive className="w-3 h-3" />
                        <span>{t("archived")}</span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{note?.title}</h1>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      {t("createdAt")}: {formatDate(note?.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <Button variant={note?.archived ? "secondary" : "outline"} size="sm" onClick={() => setShowArchiveDialog(true)} loading={actionLoading} className="flex items-center space-x-2">
                    {note?.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                    <span>{note?.archived ? t("unarchive") : t("archive")}</span>
                  </Button>

                  <Button variant="danger" size="sm" onClick={() => setShowDeleteDialog(true)} loading={actionLoading} className="flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>{t("delete")}</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-base">{note?.body}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onConfirm={handleDelete} title={t("deleteNote")} message={t("deleteNoteConfirm")} type="delete" loading={actionLoading} />
      <ConfirmDialog isOpen={showArchiveDialog} onClose={() => setShowArchiveDialog(false)} onConfirm={handleArchiveToggle} title={note?.archived ? t("unarchiveNote") : t("archiveNote")} message={note?.archived ? t("unarchiveNoteConfirm") : t("archiveNoteConfirm")} type={note?.archived ? "unarchive" : "archive"} loading={actionLoading} />
    </>
  );
};

export default NoteDetailPage;
