import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPetDetails } from "../features/pets/petDetailsSlice";
import "./PetDetails.css";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pet, vaccinations, dewormings, status, error } = useSelector(
    (state) => state.petDetails
  );
  const [activeTab, setActiveTab] = useState("vaccinations");

  useEffect(() => {
    dispatch(fetchPetDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!pet) return <div className="error">No pet found.</div>;

  return (
    <div className="pet-page-bg">
      <div className="pet-profile-card">
        <div className="pet-header-gradient">
          <div className="pet-photo"><span className="pet-icon">🐾</span></div>
          <div>
            <div className="pet-title">{pet.name}</div>
            <div className="pet-row">
              Species: {pet.species}
              <span className="dot">·</span>
              Breed: {pet.breed}
              <span className="dot">·</span>
              Age: {pet.age}
            </div>
            <div className="pet-row">Date of Arrival: {pet.notes}</div>
          </div>
        </div>

        <div className="tabs-switch">
          <button
            className={activeTab === "vaccinations" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("vaccinations")}
          >Vaccinations</button>
          <button
            className={activeTab === "deworming" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("deworming")}
          >Deworming</button>
        </div>

        <div className={activeTab === "vaccinations" ? "tab-panel show" : "tab-panel"}>
          <div className="card-block">
            <div className="card-header">
              <span>Vaccination Records</span>
              <button className="add-btn">+ Add Vaccination</button>
            </div>
            {(!vaccinations || vaccinations.length === 0) ? (
              <div className="card-empty">No vaccination records</div>
            ) : (
              vaccinations.map(v => (
                <div className="info-card" key={v._id}>
                  <div className="info-title">
                    <span className="dot orange"></span>{v.vaccineName}
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    Administered: {formatDate(v.dateGiven)}
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    Next Due: {formatDate(v.nextDueDate)}
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📝</span>
                    {v.notes}
                  </div>
                  <div className="card-actions">
                    <button className="action-icon edit">✎</button>
                    <button className="action-icon delete">🗑</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={activeTab === "deworming" ? "tab-panel show" : "tab-panel"}>
          <div className="card-block">
            <div className="card-header deworming">
              <span>Deworming Records</span>
              <button className="add-btn pink">+ Add Deworming</button>
            </div>
            {(!dewormings || dewormings.length === 0) ? (
              <div className="card-empty">No deworming records</div>
            ) : (
              dewormings.map(d => (
                <div className="info-card" key={d._id}>
                  <div className="info-title">
                    <span className="dot pink"></span>{d.medicineName}
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    Administered: {formatDate(d.dateGiven)}
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    Next Due: {formatDate(d.nextDueDate)}
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📝</span>
                    {d.notes}
                  </div>
                  <div className="card-actions">
                    <button className="action-icon edit">✎</button>
                    <button className="action-icon delete">🗑</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <button className="back-btn" onClick={() => navigate("/mypets")}>
          ← Back to Pets
        </button>
      </div>
    </div>
  );
};

export default PetDetails;
