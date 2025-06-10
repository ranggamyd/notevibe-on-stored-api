import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Archive, ArchiveRestore, Trash2, Eye, Clock } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { showFormattedDate, showFormattedDateEn } from "../../utils";
import Button from "../common/Button";
import ConfirmDialog from "../common/ConfirmDialog";

const NoteCard = ({ note, onDelete, onArchive, onUnarchive, loading = false }) => {
  const { t, isIndonesian } = useLanguage();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);

  const formatDate = (date) => (isIndonesian ? showFormattedDate(date) : showFormattedDateEn(date));

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteDialog(false);
  };

  const handleArchiveToggle = () => {
    if (note.archived) {
      onUnarchive(note.id);
    } else {
      onArchive(note.id);
    }

    setShowArchiveDialog(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group overflow-hidden">
        <div className="p-6 pb-4">
          <Link to={`/notes/${note.id}`} className="block group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{note.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">{note.body}</p>
          </Link>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{formatDate(note.createdAt)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Link to={`/notes/${note.id}`}>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400" aria-label={t("viewNote")}>
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={() => setShowArchiveDialog(true)} disabled={loading} className={`p-2 ${note.archived ? "hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400" : "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"}`} aria-label={note.archived ? t("unarchive") : t("archive")}>
                {note.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setShowDeleteDialog(true)} disabled={loading} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400" aria-label={t("delete")}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {note.archived && (
          <div className="absolute top-3 right-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Archive className="w-3 h-3" />
              <span>{t("archived")}</span>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onConfirm={handleDelete} title={t("deleteNote")} message={t("deleteNoteConfirm")} type="delete" loading={loading} />
      <ConfirmDialog isOpen={showArchiveDialog} onClose={() => setShowArchiveDialog(false)} onConfirm={handleArchiveToggle} title={note.archived ? t("unarchiveNote") : t("archiveNote")} message={note.archived ? t("unarchiveNoteConfirm") : t("archiveNoteConfirm")} type={note.archived ? "unarchive" : "archive"} loading={loading} />
    </>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  loading: PropTypes.bool,
};

export default NoteCard;
