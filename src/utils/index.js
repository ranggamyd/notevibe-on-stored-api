import React from "react";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const showFormattedDate = (date) => new Date(date).toLocaleDateString("id-ID", options);
const showFormattedDateEn = (date) => new Date(date).toLocaleDateString("en-US", options);

export { showFormattedDate, showFormattedDateEn };
