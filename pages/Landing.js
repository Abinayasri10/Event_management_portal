import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import LoginSignup from './LoginSignup';
import './Landing.css';

export default function Landing() {
  const [modal, setModal] = useState(null); // 'login' | 'signup' | null
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple animation timing for content appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="landing-page">
      <div className={`text-center space-y-6 ${isVisible ? 'fade-in' : 'hidden'}`}>
        <h1>EduEvents Portal</h1>
        <p>
          Discover, manage, and attend educational events that elevate your learning journey.
          Connect with professionals and expand your knowledge with our intuitive platform.
        </p>
        <div className="space-x-4">
          <button className="btn-outline" onClick={() => setModal('login')}>
            Login
          </button>
          <button className="btn" onClick={() => setModal('signup')}>
            Sign Up
          </button>
        </div>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">📅</span>
            <span>Event Management</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎓</span>
            <span>Educational Resources</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <span>Networking</span>
          </div>
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)}>
        <LoginSignup mode={modal} onClose={() => setModal(null)} />
      </Modal>
    </section>
  );
}