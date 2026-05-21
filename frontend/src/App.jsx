import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
    axios.get('http://localhost:5000/api/skills')
      .then(res => setSkills(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ background: '#1a1a2e', padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ color: '#e94560', margin: 0 }}>MyPortfolio</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#about"    style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <a href="#projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</a>
          <a href="#skills"   style={{ color: 'white', textDecoration: 'none' }}>Skills</a>
          <a href="#contact"  style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ background: '#16213e', color: 'white',
        padding: '6rem 2rem', textAlign: 'center', minHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>👩‍💻</div>
        <h1 style={{ fontSize: '3rem', color: '#e94560', marginBottom: '1rem' }}>
          Hi, I'm Vedha!
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a8a8b3', marginBottom: '2rem' }}>
          Full Stack Developer — React & Node.js
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#projects" style={{ background: '#e94560', color: 'white',
            padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none' }}>
            View My Work
          </a>
          <a href="#contact" style={{ border: '2px solid #e94560', color: 'white',
            padding: '0.8rem 2rem', borderRadius: '25px', textDecoration: 'none' }}>
            Contact Me
          </a>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: '#0f3460',
        padding: '4rem 2rem', color: 'white' }}>
        <h2 style={{ textAlign: 'center', color: '#e94560',
          fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Projects</h2>
        <p style={{ textAlign: 'center', color: '#a8a8b3', marginBottom: '3rem' }}>
          Things I have built
        </p>
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {projects.length === 0 ? (
            <p style={{ color: '#a8a8b3', textAlign: 'center' }}>Loading projects...</p>
          ) : projects.map(p => (
            <div key={p._id} style={{ background: '#16213e',
              padding: '2rem', borderRadius: '15px',
              transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <h3 style={{ color: '#e94560', marginBottom: '0.8rem' }}>{p.title}</h3>
              <p style={{ color: '#a8a8b3', marginBottom: '1rem' }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {p.techStack && p.techStack.map((tech, i) => (
                  <span key={i} style={{ background: '#0f3460', color: '#e94560',
                    padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
              <a href={p.githubUrl} target="_blank" rel="noreferrer"
                style={{ color: '#e94560', textDecoration: 'none', fontWeight: 'bold' }}>
                GitHub →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: '#16213e',
        padding: '4rem 2rem', color: 'white' }}>
        <h2 style={{ textAlign: 'center', color: '#e94560',
          fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Skills</h2>
        <p style={{ textAlign: 'center', color: '#a8a8b3', marginBottom: '3rem' }}>
          Technologies I work with
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
          justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
          {skills.map(s => (
            <div key={s._id} style={{ background: '#0f3460',
              padding: '1.5rem 2rem', borderRadius: '15px', textAlign: 'center',
              minWidth: '120px', transition: 'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <p style={{ color: '#e94560', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                {s.name}
              </p>
              <p style={{ color: '#a8a8b3', fontSize: '0.85rem' }}>{s.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: '#0f3460',
        padding: '4rem 2rem', color: 'white' }}>
        <h2 style={{ textAlign: 'center', color: '#e94560',
          fontSize: '2.5rem', marginBottom: '0.5rem' }}>Contact Me</h2>
        <p style={{ textAlign: 'center', color: '#a8a8b3', marginBottom: '3rem' }}>
          Let's work together!
        </p>
        {sent && <p style={{ textAlign: 'center', color: 'lightgreen',
          marginBottom: '1rem' }}>Message sent! ✅</p>}
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px',
          margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            placeholder="Your Name" required
            style={{ padding: '0.8rem', borderRadius: '8px',
              border: 'none', background: '#16213e', color: 'white', fontSize: '1rem' }} />
          <input value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            placeholder="Your Email" type="email" required
            style={{ padding: '0.8rem', borderRadius: '8px',
              border: 'none', background: '#16213e', color: 'white', fontSize: '1rem' }} />
          <textarea value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            placeholder="Your Message" rows="5" required
            style={{ padding: '0.8rem', borderRadius: '8px',
              border: 'none', background: '#16213e', color: 'white', fontSize: '1rem' }} />
          <button type="submit"
            style={{ background: '#e94560', color: 'white',
              padding: '0.8rem', border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            Send Message 🚀
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a2e', color: '#a8a8b3',
        textAlign: 'center', padding: '1.5rem' }}>
        <p>© 2026 Vedha. Built with React & Node.js ❤️</p>
      </footer>

    </div>
  );
}

export default App;