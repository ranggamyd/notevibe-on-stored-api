import React from "react";

const BASE_URL = "https://notes-api.dicoding.dev/v1";

const getAccessToken = () => localStorage.getItem("accessToken");
const putAccessToken = (accessToken) => localStorage.setItem("accessToken", accessToken);

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseJson = await response.json();
  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  const {
    data: { accessToken },
  } = responseJson;

  return accessToken;
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const responseJson = await response.json();
  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  return responseJson;
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  const user = responseJson.data;

  return user;
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  const note = responseJson.data;

  return note;
}

async function getActiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  const notes = responseJson.data;

  return notes;
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  const notes = responseJson.data;

  return notes;
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  const note = responseJson.data;

  return note;
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  return responseJson;
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  return responseJson;
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") throw new Error(message);

  return responseJson;
}

export { getAccessToken, putAccessToken, login, register, getUserLogged, addNote, getActiveNotes, getArchivedNotes, getNote, archiveNote, unarchiveNote, deleteNote };
