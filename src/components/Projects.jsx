import { useState } from 'react';
import project1 from '../assets/images/the.png';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "DO IT POSSIBLE",
      description: "3D Animation Project from 4th August to 4th September",
      image: project1,
      progress: 65,
      deadline: "2023-09-04",
      team: ["Mrhos Mkoma", "Zakia Mfinanga", "Davis Bubelwa"]
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    progress: 0,
    deadline: ""
  });

  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleAddProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      team: []
    };
    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      image: "",
      progress: 0,
      deadline: ""
    });
    setShowProjectForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="projects-section">
      <div className="section-inner">
        <h2 className="section-title">Our Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div 
                className="project-image"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                    <span>{project.progress}% Complete</span>
                  </div>
                  <div className="deadline">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </div>
                  <button className="view-button">View Project</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showProjectForm ? (
          <div className="project-form">
            <h3>Add New Project</h3>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input 
                type="text" 
                name="image"
                value={newProject.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Progress (%)</label>
              <input 
                type="number" 
                name="progress"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input 
                type="date" 
                name="deadline"
                value={newProject.deadline}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button onClick={handleAddProject}>Add Project</button>
              <button onClick={() => setShowProjectForm(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button 
            className="add-project-button"
            onClick={() => setShowProjectForm(true)}
          >
            + Add New Project
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;