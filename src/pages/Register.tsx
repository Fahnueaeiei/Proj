import React, { useState, CSSProperties } from 'react';

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [focused, setFocused] = useState<string | null>(null);

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    alert(`Account created for ${firstName} ${lastName}`);
  };

  // ── Design tokens ────────────────────────────────────────────────────
  const BASE_FONT = "'Nunito', 'Segoe UI', sans-serif";
  const ACCENT    = '#2563eb';
  const MUTED     = '#888888';
  const BORDER    = '#e8e8e8';

  // ── Styles ────────────────────────────────────────────────────────────
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
      boxSizing: 'border-box',
    } as CSSProperties,

    content: {
      flex: 1,
      padding: '48px 24px 40px',
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

    field: (id: string): CSSProperties => ({
      borderBottom: `1.5px solid ${focused === id ? ACCENT : BORDER}`,
      position: 'relative',
      marginBottom: 20,
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

    btnRegister: {
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
      marginTop: 8,
    } as CSSProperties,

    signinRow: {
      textAlign: 'center',
      fontSize: 14,
      color: MUTED,
      fontFamily: BASE_FONT,
      marginTop: 20,
    } as CSSProperties,

    signinLink: {
      color: ACCENT,
      fontWeight: 700,
      textDecoration: 'none',
    } as CSSProperties,
  };

  // ── Helper ────────────────────────────────────────────────────────────
  const Field = ({
    id, label, type = 'text', placeholder, value, onChange,
  }: {
    id: string; label: string; type?: string;
    placeholder: string; value: string; onChange: (v: string) => void;
  }) => (
    <div style={css.field(id)}>
      <label style={css.label} htmlFor={id}>{label}</label>
      <div style={css.inputRow}>
        <input
          id={id}
          style={css.input}
          type={id === 'reg-password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
        />
        {id === 'reg-password' && (
          <button
            style={css.eyeBtn}
            onClick={() => setShowPassword(v => !v)}
            type="button"
            aria-label="Toggle password"
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
        )}
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div style={css.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');`}</style>

      <div style={css.content}>

        {/* Header */}
        <div style={css.header}>
          <h1 style={css.h1}>Create Account</h1>
          <p style={css.subtitle}>Join us and plan your next adventure</p>
        </div>

        {/* Fields */}
        <Field
          id="reg-firstname" label="First Name"
          placeholder=""
          value={firstName} onChange={setFirstName}
        />
        <Field
          id="reg-lastname" label="Last Name"
          placeholder=""
          value={lastName} onChange={setLastName}
        />
        <Field
          id="reg-email" label="Email" type="email"
          placeholder="you@example.com"
          value={email} onChange={setEmail}
        />
        <Field
          id="reg-password" label="Password"
          placeholder="••••••••"
          value={password} onChange={setPassword}
        />

        {/* Register button */}
        <button style={css.btnRegister} onClick={handleRegister} type="button">
          REGISTER
        </button>

        {/* Sign in link */}
        <div style={css.signinRow}>
          Already have an account?{' '}
          <a href="/login" style={css.signinLink}>Sign in</a>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;