import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useIonRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert('Login successful');
      router.push('/home');

    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found');
      } else if (error.code === 'auth/wrong-password') {
        alert('Wrong password');
      } else if (error.code === 'auth/invalid-credential') {
        alert('Invalid email or password');
      } else {
        alert('Login failed');
      }

      console.error(error);
    }
  };

  return (
    <div className="login-page">

      <div className="login-content">

        <div className="login-header">
          <h1>Sign in</h1>
          <p>Hi Welcome back, Plan your next trip</p>
        </div>

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button className="signin-btn" onClick={handleSignIn}>
          SIGN IN
        </button>

        <div className="signup-row">
          Don't have an account?{' '}
          <span onClick={() => router.push('/register')}>
            Sign up
          </span>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;