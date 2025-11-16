import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus } from "react-icons/fi";
import "./MyPets.css";

function MyPets() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await axiosInstance.get("/pets");
        setPets(res.data);
      } catch (err) {
        console.error("Error loading pets:", err);
      }
    }
    fetchPets();
  }, []);

  return (
    <div className="mypets-wrapper">
      {/* Header */}
      <div className="mypets-header">
        <div>
          <h2>My Pets</h2>
          <p>Manage your beloved companions</p>
        </div>

        <button className="add-btn">
          <FiPlus size={16} />
          Add New Pet
        </button>
      </div>

      {/* Cards Grid */}
      <div className="pets-grid">
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card">

            {/* Gradient Top */}
            <div className="pet-card-top">
              <img
                src="/paw-icon.svg"
                alt="pet paws"
                className="paw-icon"
              />

              <div className="card-actions">
                <FiEdit2 className="icon-btn" />
                <FiTrash2 className="icon-btn" />
              </div>
            </div>

            {/* Content */}
            <div className="pet-card-body">
              <h3>{pet.name}</h3>
              <p><strong>Species:</strong> {pet.species}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p>🐾 <strong>Age:</strong> {pet.age}</p>

              <button
                className="view-btn"
                onClick={() => navigate(`/mypets/${pet._id}`)}
              >
                View Details <FiExternalLink size={14} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
