import React, { createContext, useContext } from "react";
import PropTypes from 'prop-types';
import useLocalStorage from "../hooks/useLocalStorage";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};

const translations = {
  id: {
    // Navigation
    notes: "Catatan",
    archived: "Arsip",
    addNote: "Tambah Catatan",
    logout: "Keluar",
    activeNotes: "Catatan Aktif",
    archivedNotes: "Catatan Terarsip",

    // Auth
    login: "Masuk",
    register: "Daftar",
    email: "Email",
    password: "Kata Sandi",
    confirmPassword: "Konfirmasi Kata Sandi",
    name: "Nama",
    loginButton: "Masuk",
    registerButton: "Daftar",
    loginPrompt: "Belum punya akun?",
    registerPrompt: "Sudah punya akun?",
    welcomeBack: "Selamat Datang Kembali",
    createAccount: "Buat Akun Baru",

    // Placeholders
    emailPlaceholder: "Masukkan email Anda",
    passwordPlaceholder: "Masukkan kata sandi",
    confirmPasswordPlaceholder: "Konfirmasi kata sandi",
    namePlaceholder: "Masukkan nama lengkap",
    titlePlaceholder: "Judul catatan...",
    bodyPlaceholder: "Tulis catatan Anda di sini...",

    // Notes
    noNotes: "Tidak ada catatan",
    noActiveNotes: "Tidak ada catatan aktif",
    noArchivedNotes: "Tidak ada catatan terarsip",
    noNotesDescription: "Mulai menulis catatan pertama Anda untuk mengorganisir pikiran dan ide.",
    noArchivedNotesDescription: "Catatan yang diarsipkan akan muncul di sini.",
    title: "Judul",
    body: "Isi Catatan",
    createdAt: "Dibuat pada",
    createNewNote: "Buat Catatan Baru",
    createNewNoteDescription: "Tulis catatan untuk mengorganisir pikiran Anda",
    addFirstNote: "Tambah Catatan Pertama",
    viewNote: "Lihat Catatan",

    // Actions
    delete: "Hapus",
    archive: "Arsipkan",
    unarchive: "Batal Arsip",
    save: "Simpan",
    cancel: "Batal",
    confirm: "Konfirmasi",

    // Confirmations
    deleteNote: "Hapus Catatan",
    deleteNoteConfirm: "Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.",
    archiveNote: "Arsipkan Catatan",
    archiveNoteConfirm: "Apakah Anda yakin ingin mengarsipkan catatan ini?",
    unarchiveNote: "Batal Arsip Catatan",
    unarchiveNoteConfirm: "Apakah Anda yakin ingin membatalkan arsip catatan ini?",

    // Messages
    loading: "Memuat...",
    error: "Terjadi kesalahan",
    success: "Berhasil",
    loginSuccess: "Berhasil masuk",
    registerSuccess: "Berhasil mendaftar",
    noteAdded: "Catatan berhasil ditambahkan",
    noteDeleted: "Catatan berhasil dihapus",
    noteArchived: "Catatan berhasil diarsipkan",
    noteUnarchived: "Catatan berhasil dihapus dari arsip",

    // Validation
    emailRequired: "Email wajib diisi",
    passwordRequired: "Kata sandi wajib diisi",
    nameRequired: "Nama wajib diisi",
    titleRequired: "Judul wajib diisi",
    bodyRequired: "Isi catatan wajib diisi",
    passwordMismatch: "Konfirmasi kata sandi tidak sesuai",
  },
  en: {
    // Navigation
    notes: "Notes",
    archived: "Archived",
    addNote: "Add Note",
    logout: "Logout",
    activeNotes: "Active Notes",
    archivedNotes: "Archived Notes",

    // Auth
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    loginButton: "Login",
    registerButton: "Register",
    loginPrompt: "Don't have an account?",
    registerPrompt: "Already have an account?",
    welcomeBack: "Welcome Back",
    createAccount: "Create New Account",

    // Placeholders
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    confirmPasswordPlaceholder: "Confirm your password",
    namePlaceholder: "Enter your full name",
    titlePlaceholder: "Note title...",
    bodyPlaceholder: "Write your note here...",

    // Notes
    noNotes: "No notes",
    noActiveNotes: "No active notes",
    noArchivedNotes: "No archived notes",
    noNotesDescription: "Start writing your first note to organize your thoughts and ideas.",
    noArchivedNotesDescription: "Archived notes will appear here.",
    title: "Title",
    body: "Note Content",
    createdAt: "Created at",
    createNewNote: "Create New Note",
    createNewNoteDescription: "Write a note to organize your thoughts",
    addFirstNote: "Add First Note",
    viewNote: "View Note",

    // Actions
    delete: "Delete",
    archive: "Archive",
    unarchive: "Unarchive",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",

    // Confirmations
    deleteNote: "Delete Note",
    deleteNoteConfirm: "Are you sure you want to delete this note? This action cannot be undone.",
    archiveNote: "Archive Note",
    archiveNoteConfirm: "Are you sure you want to archive this note?",
    unarchiveNote: "Unarchive Note",
    unarchiveNoteConfirm: "Are you sure you want to unarchive this note?",

    // Messages
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    loginSuccess: "Login successful",
    registerSuccess: "Registration successful",
    noteAdded: "Note added successfully",
    noteDeleted: "Note deleted successfully",
    noteArchived: "Note archived successfully",
    noteUnarchived: "Note unarchived successfully",

    // Validation
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    nameRequired: "Name is required",
    titleRequired: "Title is required",
    bodyRequired: "Note content is required",
    passwordMismatch: "Password confirmation does not match",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("language", "id");

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  const t = (key) => translations[language][key] || key;

  const value = {
    language,
    toggleLanguage,
    t,
    isIndonesian: language === "id",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
