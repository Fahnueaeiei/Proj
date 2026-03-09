import React, { useState, CSSProperties } from 'react';
import { useIonRouter } from '@ionic/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const router = useIonRouter();

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    alert(`Signing in as ${email}`);
  };

  // ── Styles ──────────────────────────────────────────────────────────
  const BASE_FONT = "'Nunito', 'Segoe UI', sans-serif";
  const ACCENT    = '#2563eb';
  const MUTED     = '#888888';
  const BORDER    = '#e8e8e8';

  const css = {
    page: {
      fontFamily: BASE_FONT,
      background: '#ffffff',
      color: '#1a1a1a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 480,
      margin: '0 auto',
      position: 'relative',
      boxSizing: 'border-box',
    } as CSSProperties,

    content: {
      flex: 1,
      padding: '0 24px 100px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
    } as CSSProperties,

    header: {
      textAlign: 'center',
      marginBottom: 36,
    } as CSSProperties,

    h1: {
      fontSize: 26,
      fontWeight: 800,
      color: '#1a1a1a',
      letterSpacing: '-0.3px',
      margin: 0,
      fontFamily: BASE_FONT,
    } as CSSProperties,

    subtitle: {
      fontSize: 14,
      color: MUTED,
      marginTop: 6,
      marginBottom: 0,
      fontFamily: BASE_FONT,
    } as CSSProperties,

    field: (focused: boolean): CSSProperties => ({
      borderBottom: `1.5px solid ${focused ? ACCENT : BORDER}`,
      position: 'relative',
      marginBottom: 18,
      transition: 'border-color 0.25s',
    }),

    label: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      color: MUTED,
      marginBottom: 6,
      fontFamily: BASE_FONT,
    } as CSSProperties,

    inputRow: {
      display: 'flex',
      alignItems: 'center',
    } as CSSProperties,

    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      fontFamily: BASE_FONT,
      fontSize: 15,
      color: '#1a1a1a',
      background: 'transparent',
      padding: '0 0 10px 0',
      boxSizing: 'border-box',
    } as CSSProperties,

    eyeBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: MUTED,
      padding: '0 0 10px 8px',
      lineHeight: 1,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    } as CSSProperties,

    forgotRow: {
      textAlign: 'right',
      marginBottom: 28,
    } as CSSProperties,

    forgotLink: {
      fontSize: 13,
      color: MUTED,
      textDecoration: 'none',
    } as CSSProperties,

    btnSignin: {
      width: '100%',
      padding: '16px',
      background: ACCENT,
      color: '#ffffff',
      border: 'none',
      borderRadius: 12,
      fontFamily: BASE_FONT,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '0.8px',
      cursor: 'pointer',
    } as CSSProperties,

    dividerWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '28px 0',
    } as CSSProperties,

    dividerLine: {
      flex: 1,
      height: 1,
      background: BORDER,
    } as CSSProperties,

    dividerText: {
      fontSize: 13,
      color: MUTED,
      whiteSpace: 'nowrap',
      fontFamily: BASE_FONT,
    } as CSSProperties,

    socialRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: 24,
      marginBottom: 32,
    } as CSSProperties,

    btnSocial: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      border: `1.5px solid ${BORDER}`,
      background: '#f9f9f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
    } as CSSProperties,

    signupRow: {
      textAlign: 'center',
      fontSize: 14,
      color: MUTED,
      fontFamily: BASE_FONT,
    } as CSSProperties,

    signupLink: {
      color: ACCENT,
      fontWeight: 700,
      textDecoration: 'none',
    } as CSSProperties,

  };

  // ────────────────────────────────────────────────────────────────────
  return (
    <div style={css.page}>
      {/* Inject Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');`}</style>

      <div style={css.content}>

        {/* ── Header ── */}
        <div style={css.header}>
          <h1 style={css.h1}>Sign in</h1>
          <p style={css.subtitle}>Hi Welcome back, Plan your next trip</p>
        </div>

        {/* ── Form ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Email */}
          <div style={css.field(emailFocused)}>
            <label style={css.label} htmlFor="lp-email">Email</label>
            <input
              id="lp-email"
              style={css.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </div>

          {/* Password */}
          <div style={css.field(passwordFocused)}>
            <label style={css.label} htmlFor="lp-password">Password</label>
            <div style={css.inputRow}>
              <input
                id="lp-password"
                style={css.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <button
                style={css.eyeBtn}
                onClick={() => setShowPassword(v => !v)}
                aria-label="Toggle password"
                type="button"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div style={css.forgotRow}>
            <a href="#" style={css.forgotLink}>Forget Password</a>
          </div>

          {/* Sign In */}
          <button style={css.btnSignin} onClick={handleSignIn} type="button">
            SIGN IN
          </button>

          {/* Divider */}
          <div style={css.dividerWrap}>
            <div style={css.dividerLine} />
            <span style={css.dividerText}>Or</span>
            <div style={css.dividerLine} />
          </div>

          {/* Social */}
          <div style={css.socialRow}>
            <button style={css.btnSocial} type="button" aria-label="Google">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            <button style={css.btnSocial} type="button" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </button>
          </div>

          {/* Sign Up */}
          <div style={css.signupRow}>
            Don't have an account?{' '}
            <a
              href="#"
              style={css.signupLink}
              onClick={e => { e.preventDefault(); router.push('/register'); }}
            >Sign up</a>
          </div>

        </div>
      </div>

      {/* Bottom nav is handled by Ionic's tab bar — no duplicate needed */}
    </div>
  );
};

export default LoginPage;