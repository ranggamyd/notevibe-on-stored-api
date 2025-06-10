import React from "react";
import PropTypes from 'prop-types';
import { Save, FileText, Type } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const NoteForm = ({ onSubmit, loading = false }) => {
  const { t } = useLanguage();
  const [title, onTitleChange, resetTitle] = useInput("");
  const [body, onBodyChange, resetBody] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    onSubmit({ title, body }, () => {
      resetTitle();
      resetBody();
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("createNewNote")}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("createNewNoteDescription")}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Type className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("title")}</label>
          </div>
          <Input value={title} onChange={onTitleChange} placeholder={t("titlePlaceholder")} required className="text-lg font-medium" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("body")}</label>
          </div>
          <Textarea value={body} onChange={onBodyChange} placeholder={t("bodyPlaceholder")} rows={10} required className="resize-none" />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button type="submit" loading={loading} disabled={!title.trim() || !body.trim()} className="inline-flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>{t("save")}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default NoteForm;
