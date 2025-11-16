import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus } from "react-icons/fi";
import { fetchPets } from "../features/pets/petsSlice";
import "./MyPets.css";

function MyPets() {
const pets = useSelector((state) => state.pets.pets);
const status = useSelector((state) => state.pets.status);
const error = useSelector((state) => state.pets.error);
const dispatch = useDispatch();
  const navigate = useNavigate();



useEffect(() => {
  if (status === 'idle') {
    dispatch(fetchPets());
  }
}, [status, dispatch]);

if (status === 'loading') return <div>Loading...</div>;
if (status === 'failed') return <div>Error: {error}</div>;

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
              <div className="paw-icon-container">
                  <span className="paw-emoji">🐾</span> 
                  <span className="paw-text">Pet Paws</span>
              </div>

              <div className="card-actions">
                <FiEdit2 className="icon-btn" />
                <FiTrash2 className="icon-btn" />
              </div>
            </div>

            {/* Content */}
            <div className="pet-card-body">
              <h3>{pet.name}</h3>
              <p>
                <strong>Species:</strong> {pet.species}
              </p>
              <p>
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p>
                <strong>Age:</strong> {pet.age}
              </p>

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
