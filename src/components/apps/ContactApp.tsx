import { useState } from 'react';
import { profile } from '@/data/profile';

export function ContactApp() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const send = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const params = new URLSearchParams({ subject: subject || 'Hi Dylan!', body });
    window.location.href = `mailto:${profile.links.email}?${params.toString().replace(/\+/g, '%20')}`;
  };

  return (
    <form className="mail" onSubmit={send}>
      <div className="mail__toolbar">
        <button type="submit" className="gloss-btn">
          <img src="/icons/mail.webp" alt="" width={18} height={18} /> Send
        </button>
        <a className="gloss-btn gloss-btn--light" href={profile.links.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a className="gloss-btn gloss-btn--light" href={profile.links.github} target="_blank" rel="noopener">
          GitHub
        </a>
      </div>
      <div className="mail__fields">
        <label className="mail__row">
          <span>To:</span>
          <input value={`${profile.name} <${profile.links.email}>`} readOnly />
        </label>
        <label className="mail__row">
          <span>Subject:</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Hi Dylan!" />
        </label>
      </div>
      <label className="sr-only" htmlFor="mail-body">
        Message
      </label>
      <textarea
        id="mail-body"
        className="mail__body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write something nice… (this opens your email app)"
      />
    </form>
  );
}
