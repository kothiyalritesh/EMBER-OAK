'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzoLRchHSpP52JyIHBbSox2fYtzcvctQfggNyAVKggkYWKyy9LeBrX5GkfL0UpY50s/exec';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Indiranagar+Bengaluru';

const contactDetails = [
  {
    label: 'Address',
    value: '12, 100 Feet Rd, HAL 2nd Stage',
    sub: 'Indiranagar, Bengaluru – 560 038',
    href: MAPS_URL,
    external: true,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
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
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'hello@emberandoak.cafe',
    href: 'mailto:hello@emberandoak.cafe',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const PHONE_RE = /^[+]?[\d\s\-().]{8,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL_FORM = { name: '', phone: '', email: '', date: '', time: '', guests: '2' };

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="field-error">
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState(INITIAL_FORM);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState('');

  const validate = useCallback((values) => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required';
    if (!values.phone.trim()) nextErrors.phone = 'Phone number is required';
    else if (!PHONE_RE.test(values.phone)) nextErrors.phone = 'Enter a valid phone number';
    if (!values.email.trim()) nextErrors.email = 'Email address is required';
    else if (!EMAIL_RE.test(values.email)) nextErrors.email = 'Enter a valid email address';
    if (!values.date) nextErrors.date = 'Please select a date';
    else if (new Date(values.date) < new Date(new Date().toDateString())) nextErrors.date = 'Date must be today or later';
    if (!values.time) nextErrors.time = 'Please select a time';
    return nextErrors;
  }, []);

  const onChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (errors[name]) setErrors((currentErrors) => ({ ...currentErrors, [name]: validate(next)[name] || '' }));
      return next;
    });
  }, [errors, validate]);

  const onBlurField = useCallback((field) => {
    setFocused(null);
    setErrors((current) => ({ ...current, [field]: validate(form)[field] || '' }));
  }, [form, validate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setServerErr('');
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm(INITIAL_FORM);
      }, 5000);
    } catch {
      setServerErr('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    height: '54px',
    padding: '0 18px',
    background: errors[field] ? 'rgba(224,112,112,0.055)' : 'rgba(12,9,7,0.42)',
    border: `1px solid ${errors[field] ? 'rgba(224,112,112,0.5)' : focused === field ? 'var(--caramel)' : 'rgba(255,255,255,0.09)'}`,
    borderRadius: '14px',
    color: 'var(--cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.94rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
    boxShadow: focused === field && !errors[field] ? '0 0 0 4px rgba(200,138,74,0.14)' : 'none',
    appearance: 'none',
    colorScheme: 'dark',
  });

  const labelStyle = {
    display: 'block',
    marginBottom: '7px',
    color: 'rgba(243,230,208,0.68)',
    fontSize: '0.76rem',
    fontWeight: 600,
    letterSpacing: '0.035em',
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section ref={ref} id="visit" className="visit-section">
      <div className="visit-ambient" aria-hidden="true" />
      <div className="visit-shell">
        <motion.header className="visit-intro" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
          <span className="label-text">Visit Ember &amp; Oak</span>
          <h2>Come for the coffee.<br /><em>Stay for the pause.</em></h2>
          <p>Plan a quiet morning, a long conversation, or a table for something worth celebrating.</p>
        </motion.header>

        <div className="visit-grid">
          <motion.article className="visit-card find-card" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="visit-card-heading">
              <span className="card-kicker">Our café</span>
              <h3>Find Us</h3>
              <p>Visit us for slow mornings, warm conversations, and handcrafted coffee.</p>
            </div>

            <motion.div className="contact-list" variants={listVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              {contactDetails.map((detail) => {
                const content = (
                  <>
                    <span className="contact-icon">{detail.icon}</span>
                    <span className="contact-copy">
                      <span className="contact-label">{detail.label}</span>
                      <span className="contact-value">{detail.value}</span>
                      {detail.sub && <span className="contact-sub">{detail.sub}</span>}
                    </span>
                  </>
                );

                return detail.href ? (
                  <motion.a variants={revealItem} key={detail.label} href={detail.href} target={detail.external ? '_blank' : undefined} rel={detail.external ? 'noopener noreferrer' : undefined} aria-label={`${detail.label}: ${detail.value}`} className="contact-row">
                    {content}
                  </motion.a>
                ) : (
                  <motion.div variants={revealItem} key={detail.label} className="contact-row">{content}</motion.div>
                );
              })}
            </motion.div>
          </motion.article>

          <motion.article className="visit-card reservation-card" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="visit-card-heading">
              <span className="card-kicker">Make it yours</span>
              <h3>Reserve a Table</h3>
              <p>Choose your time and we’ll keep your corner warm.</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" className="reservation-success" role="alert" aria-live="polite" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <span className="success-icon">
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h4>Reservation Received</h4>
                  <p>We’ll call you shortly to confirm your table.</p>
                </motion.div>
              ) : (
                <motion.form key="form" className="reservation-form" onSubmit={onSubmit} noValidate variants={listVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} exit={{ opacity: 0 }} aria-label="Table reservation form">
                  <motion.div variants={revealItem}>
                    <label htmlFor="res-name" style={labelStyle}>Name *</label>
                    <input id="res-name" type="text" name="name" value={form.name} onChange={onChange} onFocus={() => setFocused('name')} onBlur={() => onBlurField('name')} placeholder="e.g. Aanya Mehra" autoComplete="name" aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} style={inputStyle('name')} />
                    <FieldError id="err-name">{errors.name}</FieldError>
                  </motion.div>

                  <motion.div variants={revealItem}>
                    <label htmlFor="res-phone" style={labelStyle}>Phone Number *</label>
                    <input id="res-phone" type="tel" name="phone" value={form.phone} onChange={onChange} onFocus={() => setFocused('phone')} onBlur={() => onBlurField('phone')} placeholder="+91 98765 43210" autoComplete="tel" aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} style={inputStyle('phone')} />
                    <FieldError id="err-phone">{errors.phone}</FieldError>
                  </motion.div>

                  <motion.div variants={revealItem}>
                    <label htmlFor="res-email" style={labelStyle}>Email Address *</label>
                    <input id="res-email" type="email" name="email" value={form.email} onChange={onChange} onFocus={() => setFocused('email')} onBlur={() => onBlurField('email')} placeholder="you@example.com" autoComplete="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} style={inputStyle('email')} />
                    <FieldError id="err-email">{errors.email}</FieldError>
                  </motion.div>

                  <motion.div variants={revealItem} className="reservation-fields">
                    <div>
                      <label htmlFor="res-date" style={labelStyle}>Date *</label>
                      <input id="res-date" type="date" name="date" value={form.date} min={today} onChange={onChange} onFocus={() => setFocused('date')} onBlur={() => onBlurField('date')} aria-required="true" aria-invalid={!!errors.date} aria-describedby={errors.date ? 'err-date' : undefined} style={inputStyle('date')} />
                      <FieldError id="err-date">{errors.date}</FieldError>
                    </div>
                    <div>
                      <label htmlFor="res-time" style={labelStyle}>Time *</label>
                      <input id="res-time" type="time" name="time" value={form.time} min="08:00" max="22:30" onChange={onChange} onFocus={() => setFocused('time')} onBlur={() => onBlurField('time')} aria-required="true" aria-invalid={!!errors.time} aria-describedby={errors.time ? 'err-time' : undefined} style={inputStyle('time')} />
                      <FieldError id="err-time">{errors.time}</FieldError>
                    </div>
                    <div>
                      <label htmlFor="res-guests" style={labelStyle}>Guests</label>
                      <div className="select-wrap">
                        <select id="res-guests" name="guests" value={form.guests} onChange={onChange} onFocus={() => setFocused('guests')} onBlur={() => setFocused(null)} style={{ ...inputStyle('guests'), paddingRight: '38px', cursor: 'pointer' }}>
                          {[1, 2, 3, 4, 5, 6].map((number) => <option key={number} value={number} style={{ background: '#1D1713' }}>{number} {number === 1 ? 'Guest' : 'Guests'}</option>)}
                        </select>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {serverErr && <p role="alert" className="form-server-error">{serverErr}</p>}

                  <motion.button variants={revealItem} type="submit" className="btn-primary reservation-submit" disabled={loading} aria-busy={loading}>
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true" style={{ animation: 'spin-slow 0.8s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                        </svg>
                        Reserving…
                      </>
                    ) : (
                      <>
                        Reserve a Table
                        <svg className="submit-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.article>
        </div>
      </div>

      <style>{`
        .visit-section { position: relative; overflow: hidden; padding: 110px 0; }
        .visit-ambient { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 72% 45%, rgba(200,138,74,.075), transparent 34%), linear-gradient(180deg, rgba(58,36,24,.08), rgba(18,16,14,.2)); }
        .visit-shell { position: relative; z-index: 1; width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .visit-intro { max-width: 720px; margin-bottom: 48px; }
        .visit-intro .label-text { display: block; margin-bottom: 15px; }
        .visit-intro h2 { font-family: var(--font-heading); font-size: clamp(34px, 3.5vw, 42px); font-weight: 400; line-height: 1.12; letter-spacing: -.018em; color: var(--cream); }
        .visit-intro h2 em { color: var(--caramel); font-weight: 400; }
        .visit-intro > p { max-width: 590px; margin-top: 17px; color: rgba(243,230,208,.68); font-size: .97rem; line-height: 1.75; }
        .visit-grid { display: grid; grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); gap: 36px; align-items: stretch; }
        .visit-card { position: relative; overflow: hidden; min-width: 0; padding: 44px; border: 1px solid rgba(255,255,255,.08); border-radius: 30px; background: radial-gradient(circle at 15% 0%, rgba(200,138,74,.085), transparent 34%), linear-gradient(155deg, rgba(42,27,19,.92), rgba(20,15,12,.96)); box-shadow: 0 24px 64px rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.035); }
        .visit-card::before { content: ''; position: absolute; inset: 0 12% auto; height: 1px; background: linear-gradient(90deg, transparent, rgba(214,161,95,.28), transparent); }
        .visit-card-heading { margin-bottom: 28px; }
        .card-kicker { display: block; margin-bottom: 9px; color: var(--caramel); font-family: var(--font-body); font-size: .68rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .visit-card-heading h3 { font-family: var(--font-subheading); font-size: clamp(34px, 3vw, 40px); font-weight: 400; line-height: 1.15; letter-spacing: -.015em; color: var(--cream); }
        .visit-card-heading p { max-width: 470px; margin-top: 12px; color: rgba(243,230,208,.62); font-size: .9rem; line-height: 1.68; }
        .find-card { display: flex; flex-direction: column; }
        .find-card .contact-list { flex: 1; justify-content: space-between; }
        .contact-list { display: flex; flex-direction: column; gap: 11px; }
        .contact-row { display: flex; align-items: flex-start; gap: 15px; margin: 0 -10px; padding: 10px; border-radius: 16px; transition: transform .3s var(--ease), background .3s ease; }
        .contact-row:hover { background: rgba(200,138,74,.055); transform: translateY(-2px); }
        .contact-icon { display: flex; align-items: center; justify-content: center; flex: 0 0 46px; width: 46px; height: 46px; border: 1px solid rgba(200,138,74,.16); border-radius: 14px; background: rgba(200,138,74,.08); color: var(--caramel); transition: background .3s ease, box-shadow .3s ease, transform .3s var(--ease); }
        .contact-row:hover .contact-icon { background: rgba(200,138,74,.15); box-shadow: 0 8px 24px rgba(200,138,74,.1); transform: scale(1.03); }
        .contact-copy { display: flex; min-width: 0; flex-direction: column; padding-top: 1px; }
        .contact-label { margin-bottom: 3px; color: rgba(243,230,208,.48); font-size: .69rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; }
        .contact-value { overflow-wrap: anywhere; color: rgba(243,230,208,.94); font-size: .89rem; font-weight: 500; line-height: 1.45; transition: color .3s ease; }
        a.contact-row:hover .contact-value { color: var(--caramel); }
        .contact-sub { margin-top: 2px; color: rgba(243,230,208,.43); font-size: .75rem; line-height: 1.45; }
        .reservation-form { display: flex; flex-direction: column; gap: 20px; }
        .reservation-fields { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
        .select-wrap { position: relative; }
        .select-wrap > svg { position: absolute; top: 50%; right: 14px; color: rgba(243,230,208,.42); pointer-events: none; transform: translateY(-50%); }
        .field-error { display: flex; align-items: center; gap: 4px; margin-top: 5px; color: #e58a82; font-size: .72rem; line-height: 1.35; }
        .form-server-error { color: #e58a82; text-align: center; font-size: .8rem; }
        .reservation-submit { width: 100%; height: 58px; margin-top: 2px; font-size: .94rem; }
        .submit-arrow { transition: transform .3s var(--ease); }
        .reservation-submit:hover .submit-arrow { transform: translateX(4px); }
        .reservation-success { display: flex; min-height: 440px; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .success-icon { display: flex; width: 64px; height: 64px; align-items: center; justify-content: center; margin-bottom: 22px; border: 1px solid rgba(200,138,74,.28); border-radius: 50%; background: rgba(200,138,74,.11); color: var(--caramel); }
        .reservation-success h4 { font-family: var(--font-subheading); color: var(--caramel); font-size: 1.45rem; font-weight: 400; }
        .reservation-success p { margin-top: 9px; color: rgba(243,230,208,.58); font-size: .88rem; }
        @media (max-width: 1024px) {
          .visit-grid { grid-template-columns: minmax(0,.85fr) minmax(0,1.15fr); gap: 30px; }
          .visit-card { padding: 34px; }
          .reservation-fields { grid-template-columns: 1fr 1fr; }
          .reservation-fields > div:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 760px) {
          .visit-section { padding: 80px 0; }
          .visit-shell { padding: 0 20px; }
          .visit-intro { margin-bottom: 36px; }
          .visit-intro h2 { font-size: clamp(30px, 9vw, 34px); }
          .visit-grid { grid-template-columns: 1fr; gap: 24px; }
          .visit-card { padding: 26px; border-radius: 26px; }
          .visit-card-heading h3 { font-size: clamp(30px, 9vw, 34px); }
          .reservation-fields { grid-template-columns: 1fr; gap: 20px; }
          .reservation-fields > div:last-child { grid-column: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-row, .contact-icon, .submit-arrow { transition: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
