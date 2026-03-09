import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Register.css';

const RegisterPage: React.FC = () => {
  const router = useIonRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Register successful');
      router.push('/login');
    } catch (error) {
      alert('Register failed');
      console.error(error);
    }
  };

  return (
    <div className="register-page">

      <div className="register-content">

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join us and plan your next adventure</p>
        </div>

        <div className="register-field">
          <label>First Name</label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>

        <div className="register-field">
          <label>Last Name</label>
          <input value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>

        <div className="register-field">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="register-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className="register-btn" onClick={handleRegister}>
          REGISTER
        </button>

        <div className="signin-row">
          Already have an account?{' '}
          <span onClick={() => router.push('/login')}>
            Sign in
          </span>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;