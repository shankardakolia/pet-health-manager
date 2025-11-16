import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./RecordCard.css";

const RecordCard = ({ title, dateGiven, nextDueDate, notes, pinkDot }) => {
  function formatDate(date) {
    return date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
  }

  return (
    <div className="record-card">
      <div className="record-title">
        <span className={`dot ${pinkDot ? "pink" : "orange"}`}></span> {title}
      </div>
      <div className="record-row">Administered: {formatDate(dateGiven)}</div>
      <div className="record-row">Next Due: {formatDate(nextDueDate)}</div>
      <div className="record-row">{notes}</div>
      <div className="actions">
        <button className="icon-button"><FiEdit /></button>
        <button className="icon-button delete"><FiTrash2 /></button>
      </div>
    </div>
  );
};

export default RecordCard;
