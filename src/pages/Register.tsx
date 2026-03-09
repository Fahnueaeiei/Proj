import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './Register.css';

const RegisterPage: React.FC = () => {
  const router = useIonRouter();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !username || !phoneNumber || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'profile', uid), {
        fullName,
        username,
        phoneNumber,
        email
      });

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
          <label>Full Name</label>
          <input
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>

        <div className="register-field">
          <label>Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="register-field">
          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="register-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="register-field">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
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