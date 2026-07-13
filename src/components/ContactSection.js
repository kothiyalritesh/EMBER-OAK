'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ← Replace with your deployed Google Apps Script Web App URL
//    1. Create a Google Sheet with columns: Timestamp, Name, Phone, Date, Guests, Submitted At
//    2. Extensions → Apps Script → Paste code.gs → Deploy → New deployment → Web app
//    3. Set "Execute as: Me", "Who has access: Anyone"
//    4. Copy the deployment URL and paste it below
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzoLRchHSpP52JyIHBbSox2fYtzcvctQfggNyAVKggkYWKyy9LeBrX5GkfL0UpY50s/exec ';

const contactDetails = [
  {
    label: 'Address',
    value: '12, 100 Feet Rd, HAL 2nd Stage',
    sub: 'Indiranagar, Bengaluru – 560 038',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Hours',
    value: '8:00 AM – 11:00 PM',
    sub: 'Open daily, including weekends',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 98765 43210',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'hello@emberandoak.cafe',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm]       = useState({ name: '', phone: '', date: '', guests: '2' });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) return;
    setLoading(true);
    setError('');
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', guests: '2' }); }, 4500);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    height: '54px',
    padding: '0 18px',
    background: 'rgba(243,230,208,0.04)',
    border: `1px solid ${focused === field ? 'var(--caramel)' : 'rgba(243,230,208,0.1)'}`,
    borderRadius: '14px',
    color: 'var(--cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
    boxShadow: focused === field ? '0 0 0 3px rgba(200,138,74,0.12)' : 'none',
    appearance: 'none',
    colorScheme: 'dark',
  });

  return (
    <section ref={ref} id="visit" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(58,36,24,0.1) 0%, transparent 50%, rgba(58,36,24,0.12) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 72px' }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '16px' }}>Visit Us</span>
          <h2 className="section-heading">
            Reserve<br />
            <span className="text-grad">Your Corner.</span>
          </h2>
          <div className="divider center" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>

          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="card">
              <h3 style={{
                fontFamily: 'var(--font-subheading)',
                fontSize: '1.4rem',
                color: 'var(--cream)',
                marginBottom: '28px',
              }}>
                Find Us
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {contactDetails.map(d => (
                  <div key={d.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: 'rgba(200,138,74,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--caramel)', flexShrink: 0,
                    }}>
                      {d.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '3px' }}>{d.label}</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--cream)', fontWeight: 500 }}>{d.value}</p>
                      {d.sub && <p style={{ fontSize: '0.75rem', color: 'rgba(243,230,208,0.3)', marginTop: '2px' }}>{d.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="card">
              <h3 style={{
                fontFamily: 'var(--font-subheading)',
                fontSize: '1.4rem',
                color: 'var(--cream)',
                marginBottom: '6px',
              }}>
                Reserve a Table
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '28px' }}>
                Book your spot for a slow-brewed experience.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '48px 0', textAlign: 'center',
                    }}
                  >
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%',
                      background: 'rgba(200,138,74,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '16px',
                    }}>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--caramel)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '1.1rem', color: 'var(--caramel)', marginBottom: '8px' }}>
                      Reservation Received
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                      We'll call you shortly to confirm your table.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '7px' }}>
                        Your Name
                      </label>
                      <input
                        type="text" name="name" value={form.name}
                        onChange={onChange} required
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="e.g. Aanya Mehra"
                        style={inputStyle('name')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '7px' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel" name="phone" value={form.phone}
                        onChange={onChange} required
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        placeholder="+91 98765 43210"
                        style={inputStyle('phone')}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '7px' }}>
                          Date
                        </label>
                        <input
                          type="date" name="date" value={form.date}
                          onChange={onChange} required
                          onFocus={() => setFocused('date')}
                          onBlur={() => setFocused(null)}
                          style={inputStyle('date')}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '7px' }}>
                          Guests
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select
                            name="guests" value={form.guests}
                            onChange={onChange}
                            onFocus={() => setFocused('guests')}
                            onBlur={() => setFocused(null)}
                            style={{ ...inputStyle('guests'), paddingRight: '40px', cursor: 'pointer' }}
                          >
                            {[1,2,3,4,5,6].map(n => (
                              <option key={n} value={n} style={{ background: '#1D1713' }}>
                                {n} {n === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                          <svg
                            width="14" height="14" fill="none" viewBox="0 0 24 24"
                            stroke="rgba(243,230,208,0.35)" strokeWidth={2}
                            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <p style={{ fontSize: '0.8rem', color: '#e07070', textAlign: 'center' }}>{error}</p>
                    )}

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{ width: '100%', marginTop: '8px', height: '54px', fontSize: '0.9rem', opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? 'Reserving…' : 'Reserve a Table'}
                      {!loading && (
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </button>

                    <p style={{ fontSize: '0.75rem', color: 'rgba(243,230,208,0.28)', textAlign: 'center' }}>
                      We'll confirm your reservation within 30 minutes.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
