import React, { useEffect, useState } from "react";
import { getGeneralProjects } from "../api";
import ProjectModal from "./ProjectModal";
import "./ProjectsSection.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getGeneralProjects();
      if (!data?.error) {
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="projects" id="projects">
      <h2 className="projects-title">Our Products</h2>
      <p className="projects-subtitle">
        Real-world engineering solutions delivered with precision and innovation.
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={
                project.images?.length
                  ? `${API_URL}${project.images[0].imageUrl}`
                  : "/placeholder.png"
              }
              alt={project.title}
              className="project-image"
            />

            <div className="project-overlay">
              <h3>{project.title}</h3>
              <p>{project.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
