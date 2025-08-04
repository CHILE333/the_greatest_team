import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/images/the.png'; // Assuming the logo is in the src directory

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    { name: 'Chilengwe Siachalwe', role: 'Animator' },
    { name: 'Zakia Mfinanga', role: 'Game Developer' },
    { name: 'Mariam Ngoi', role: 'Educator' },
    { name: 'Josebert Fredy', role: 'Lead Animator' },
    { name: 'Evance Mosha', role: 'Game Designer' },
    { name: 'Clara Conrad', role: 'Education Specialist' },
    { name: 'Davis Bubelwa', role: '3D Artist' },
    { name: 'Kundi Thomas', role: 'Game Programmer' },
    { name: 'Lukas Siyame', role: 'Instructional Designer' },
    { name: 'Asifiwe Nelson', role: 'Animation Director' },
    { name: 'Daud Sospeter', role: 'Game Tester' },
  ];

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
            onClick={() => setActiveSection('values')}
            className={activeSection === 'values' ? 'active' : ''}
          >
            Values
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-word title-word-1">CREATING</span>
              <span className="title-word title-word-2">THE</span>
              <span className="title-word title-word-3">FUTURE</span>
              <span className="title-word title-word-4">TODAY</span>
            </h1>
            <p className="hero-subtitle">Innovating Animation, Gaming, and Education</p>
            <button className="cta-button pulse">Explore Our Services</button>
          </div>
          <div className="hero-illustration">
            <div className="team-circle">
              {teamMembers.map((_, i) => (
                <div
                  key={i}
                  className="team-member-avatar"
                  style={{
                    transform: `rotate(${i * (360 / teamMembers.length)}deg) translate(120px) rotate(-${i * (360 / teamMembers.length)}deg)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="values-section">
        <div className="section-inner">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Animation Excellence</h3>
              <p>Crafting captivating stories through cutting-edge animation techniques.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎮</div>
              <h3>Gaming Innovation</h3>
              <p>Building immersive gaming experiences that push technological boundaries.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">📚</div>
              <h3>Educational Impact</h3>
              <p>Empowering learners with transformative educational solutions.</p>
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
                <div className="member-avatar"></div>
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