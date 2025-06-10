import React from "react";
import PropTypes from 'prop-types';
import { AlertTriangle, Trash2, Archive, ArchiveRestore } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import Button from "./Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, type = "danger", loading = false }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "delete":
        return <Trash2 className="w-6 h-6 text-red-500" />;
      case "archive":
        return <Archive className="w-6 h-6 text-blue-500" />;
      case "unarchive":
        return <ArchiveRestore className="w-6 h-6 text-green-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getButtonVariant = () => {
    switch (type) {
      case "delete":
        return "danger";
      case "archive":
        return "primary";
      case "unarchive":
        return "secondary";
      default:
        return "danger";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">{getIcon()}</div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">{title}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <Button variant={getButtonVariant()} onClick={onConfirm} loading={loading} className="w-full sm:ml-3 sm:w-auto">
              {t("confirm")}
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={loading} className="mt-3 w-full sm:mt-0 sm:w-auto">
              {t("cancel")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['danger', 'delete', 'archive', 'unarchive']),
  loading: PropTypes.bool,
};

export default ConfirmDialog;
