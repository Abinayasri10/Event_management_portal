import { useState } from 'react';
import Modal from '../components/Modal';
import LoginSignup from './LoginSignup';

export default function Landing() {
  const [modal, setModal] = useState(null); // 'login' | 'signup' | null
  return (
    <section className="h-screen grid place-items-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">EduEvents Portal</h1>
        <p>Manage &amp; attend educational events effortlessly.</p>
        <div className="space-x-4">
          <button className="btn" onClick={() => setModal('login')}>
            Login
          </button>
          <button className="btn-outline" onClick={() => setModal('signup')}>
            Sign Up
          </button>
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)}>
        <LoginSignup mode={modal} onClose={() => setModal(null)} />
      </Modal>
    </section>
  );
}
