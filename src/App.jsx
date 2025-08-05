import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './App.css';
import logo from './assets/images/the.png';
import chatIcon from './assets/images/chat.png';
import Chat from './Chat';

function MainApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "DO IT POSSIBLE",
      description: "3D Animation Project from 4th August to 4th September no excuse",
      image: "project1.png",
      progress: 65,
      deadline: "2023-09-04",
      team: ["Method Mkoma", "Zakia Mfinanga", "Davis Bubelwa"]
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const words = document.querySelectorAll('.title-word');
    words.forEach((word, i) => {
      setTimeout(() => {
        word.style.opacity = 1;
        word.style.transform = 'translateY(0)';
      }, i * 500);
    });
  }, []);

  const teamMembers = [
    { name: 'Method Mkoma', role: 'Lead Animator', image: 'member1.png' },
    { name: 'Chilengwe Siachalwe', role: 'Animator', image: 'member2.png' },
    { name: 'Zakia Mfinanga', role: 'Game Developer', image: 'member3.png' },
    { name: 'Mariam Ngoi', role: 'Educator', image: 'member4.png' },
    { name: 'Josebert Fredy', role: 'Lead Animator', image: 'member5.png' },
    { name: 'Evance Mosha', role: 'Game Designer', image: 'member6.png' },
    { name: 'Clara Conrad', role: 'Education Specialist', image: 'member7.png' },
    { name: 'Davis Bubelwa', role: '3D Artist', image: 'member8.png' },
    { name: 'Kundi Thomas', role: 'Game Programmer', image: 'member9.png' },
    { name: 'Lukas Siyame', role: 'Instructional Designer', image: 'member10.png' },
    { name: 'Asifiwe Nelson', role: 'Animation Director', image: 'member11.png' },
    { name: 'Daud Sospeter', role: 'Game Tester', image: 'member12.png' },
  ];

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

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <nav className={`floating-nav ${scrollY > 100 ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <img src={logo} alt="The Greatest Company Logo" style={{ height: '40px' }} />
        </div>
        
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            onClick={() => {
              scrollToSection('home');
              navigate('/');
            }}
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className={activeSection === 'team' ? 'active' : ''}
          >
            Our Team
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setActiveSection('chat');
              navigate('/chat');
              setMobileMenuOpen(false);
            }}
            className={activeSection === 'chat' ? 'active' : ''}
          >
            Team Chat
          </button>
        </div>
      </nav>

      <section className="hero" ref={heroRef} id="home">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-word title-word-1">CREATING</span>
              <span className="title-word title-word-2">WITH GOD</span>
              <span className="title-word title-word-3">POWERING PLAY</span>
              <span className="title-word title-word-4">INSPIRING MINDS</span>
            </h1>
            <p className="hero-subtitle">Innovating Animation, Gaming, and Education</p>
            <button 
              className="cta-button pulse"
              onClick={() => scrollToSection('projects')}
            >
              View Our Projects
            </button>
          </div>
          <div className="hero-illustration">
            <div className="team-circle">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="team-member-avatar"
                  style={{
                    transform: `rotate(${i * (360 / teamMembers.length)}deg) translate(120px) rotate(-${i * (360 / teamMembers.length)}deg)`,
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
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

      <section className="team-showcase" id="team">
        <div className="section-inner">
          <h2 className="section-title">Meet The Team</h2>
          <div className="team-members">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-member-card">
                <div 
                  className="member-avatar"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="social-links">
                  <span>📱</span>
                  <span>💻</span>
                  <span>📧</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div 
        className={`floating-chat-icon ${scrollY > 100 ? 'visible' : ''}`}
        onClick={() => {
          setActiveSection('chat');
          navigate('/chat');
        }}
      >
        <img src={chatIcon} alt="Chat" />
        <span className="notification-badge">3</span>
      </div>

      <footer className="main-footer">
        <div className="footer-inner">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} alt="The Greatest Company Logo" style={{ height: '40px' }} />
            </div>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div className="footer-social">
              <span className="social-icon">📘</span>
              <span className="social-icon">📸</span>
              <span className="social-icon">🔗</span>
              <span className="social-icon">🐦</span>
            </div>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} The Greatest Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/chat" element={<Chat teamMembers={[
          { name: 'Method Mkoma', role: 'Lead Animator', image: 'member1.png' },
          { name: 'Chilengwe Siachalwe', role: 'Animator', image: 'member2.png' },
          { name: 'Zakia Mfinanga', role: 'Game Developer', image: 'member3.png' },
          { name: 'Mariam Ngoi', role: 'Educator', image: 'member4.png' },
          { name: 'Josebert Fredy', role: 'Lead Animator', image: 'member5.png' },
          { name: 'Evance Mosha', role: 'Game Designer', image: 'member6.png' },
          { name: 'Clara Conrad', role: 'Education Specialist', image: 'member7.png' },
          { name: 'Davis Bubelwa', role: '3D Artist', image: 'member8.png' },
          { name: 'Kundi Thomas', role: 'Game Programmer', image: 'member9.png' },
          { name: 'Lukas Siyame', role: 'Instructional Designer', image: 'member10.png' },
          { name: 'Asifiwe Nelson', role: 'Animation Director', image: 'member11.png' },
          { name: 'Daud Sospeter', role: 'Game Tester', image: 'member12.png' },
        ]} />} />
      </Routes>
    </Router>
  );
}

export default App;