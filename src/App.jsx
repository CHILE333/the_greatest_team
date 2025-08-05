import { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/images/the.png';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "DO IT POSSIBLE",
      description: "3D Animation Project from 4th August to 4th September",
      image: "project1.png",
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
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate slogan words sequentially
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

  return (
    <div className="app-container">
      {/* Animated Background */}
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

      {/* Floating Navigation */}
      <nav className={`floating-nav ${scrollY > 100 ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <img src={logo} alt="The Greatest Company Logo" style={{ height: '40px' }} />
        </div>
        <div className="nav-links">
          <button
            onClick={() => setActiveSection('home')}
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button
            onClick={() => setActiveSection('team')}
            className={activeSection === 'team' ? 'active' : ''}
          >
            Our Team
          </button>
          <button
            onClick={() => setActiveSection('projects')}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveSection('chat')}
            className={activeSection === 'chat' ? 'active' : ''}
          >
            Team Chat
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
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
              onClick={() => setActiveSection('projects')}
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

      {/* Projects Section */}
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

      {/* Team Chat Section */}
      <section className="chat-section">
        <div className="section-inner">
          <h2 className="section-title">Team Chat</h2>
          <div className="chat-container">
            <div className="chat-members">
              <h3>Team Members</h3>
              <ul>
                {teamMembers.map((member, i) => (
                  <li key={i}>
                    <div 
                      className="member-avatar"
                      style={{ backgroundImage: `url(${member.image})` }}
                    ></div>
                    <span>{member.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chat-messages">
              <div className="messages-container">
                <div className="message received">
                  <div 
                    className="message-avatar"
                    style={{ backgroundImage: `url(${teamMembers[0].image})` }}
                  ></div>
                  <div className="message-content">
                    <div className="message-sender">{teamMembers[0].name}</div>
                    <div className="message-text">Hey team! How's the animation coming along?</div>
                    <div className="message-time">10:30 AM</div>
                  </div>
                </div>
                <div className="message sent">
                  <div className="message-content">
                    <div className="message-text">Going well! Should have the first draft by EOD.</div>
                    <div className="message-time">10:32 AM</div>
                  </div>
                  <div 
                    className="message-avatar"
                    style={{ backgroundImage: `url(${teamMembers[2].image})` }}
                  ></div>
                </div>
                <div className="message received">
                  <div 
                    className="message-avatar"
                    style={{ backgroundImage: `url(${teamMembers[3].image})` }}
                  ></div>
                  <div className="message-content">
                    <div className="message-sender">{teamMembers[3].name}</div>
                    <div className="message-text">Don't forget we have the client review tomorrow at 2PM</div>
                    <div className="message-time">10:35 AM</div>
                  </div>
                </div>
              </div>
              <div className="message-input">
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="team-showcase">
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

      {/* Footer */}
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

export default App;