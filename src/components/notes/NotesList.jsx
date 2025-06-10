import React from "react";
import PropTypes from 'prop-types';
import { Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import NoteCard from "./NoteCard";
import LoadingSkeleton from "../common/LoadingSkeleton";
import Button from "../common/Button";

const NotesList = ({ notes, loading, onDelete, onArchive, onUnarchive, emptyMessage, actionLoading = false, showAddButton = false }) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{emptyMessage || t("noNotes")}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">{showAddButton ? t("noNotesDescription") : t("noArchivedNotesDescription")}</p>
        {showAddButton && (
          <Link to="/add">
            <Button className="inline-flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>{t("addFirstNote")}</span>
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} onUnarchive={onUnarchive} loading={actionLoading} />
      ))}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  emptyMessage: PropTypes.string,
  actionLoading: PropTypes.bool,
  showAddButton: PropTypes.bool,
};

export default NotesList;
