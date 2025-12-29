import React from "react";
import "./ProjectModal.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function ProjectModal({ project, onClose }) {
  const images = project.images || [];

  
  const paragraphs = project.description
    ? project.description.split("\n\n")
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>{project.title}</h2>

        {images[0] && (
          <div className="modal-main-image">
            <img
              src={`${API_URL}${images[0].imageUrl}`}
              alt={project.title}
            />
          </div>
        )}

        
        <div className="modal-sections">
          {paragraphs.map((text, index) => {
            const image = images[index + 1]; 

            return (
              <div
                key={index}
                className={`modal-section ${
                  index % 2 === 0 ? "normal" : "reverse"
                }`}
              >
                <div className="section-text">
                  <p>{text}</p>
                </div>

                {image && (
                  <div className="section-image">
                    <img
                      src={`${API_URL}${image.imageUrl}`}
                      alt=""
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="modal-actions">
          <button className="quote-btn">Get a Quote</button>
        </div>
      </div>
    </div>
  );
}
