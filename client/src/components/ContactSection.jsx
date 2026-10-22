import React, { useState } from 'react';
import { Mail, MessageSquare, Linkedin, Github, Download, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ContactSection({ personal, t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden bot trap
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [responseLog, setResponseLog] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setResponseLog(null);

    const startTime = Date.now();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const elapsed = Date.now() - startTime;

      if (!res.ok) {
        throw new Error(data.details?.join(', ') || data.message || `Server returned ${res.status}`);
      }

      setStatus('success');
      setResponseLog({
        status: res.status,
        statusText: 'Created / Transmitted',
        payload: data,
        elapsed,
      });

      // Clear form except honeypot
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });

      // Trigger celebratory confetti
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
      } catch (err) {}
    } catch (err) {
      console.warn('[Contact Submission]', err.message);
      setStatus('error');
      setErrorMessage(err.message || 'Network error transmitting message');
      setResponseLog({
        status: 500,
        statusText: 'Internal Error',
        payload: { error: err.message, suggestion: 'Please reach out via WhatsApp or email directly.' },
        elapsed: Date.now() - startTime,
      });
    }
  };

  return (
    <section id="contact" className="py-8 border-b border-line">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-wider">
            {t('contact.tag')}
          </div>
          <h2 className="font-display font-bold text-2xl text-fg">
            {t('contact.title')}
          </h2>
        </div>

        <div className="font-mono text-xs px-2.5 py-1 border border-ok/40 bg-ok/10 text-ok flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-ok pulse-dot" />
          <span>{t('contact.responseTime')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: POST /contact specification + Direct Links */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          {/* Raw HTTP specification block from status.html */}
          <div className="bg-surface-2 border border-line p-4 space-y-2">
            <div className="text-muted text-[11px] uppercase tracking-wider">
              {t('contact.reqHeader')}
            </div>
            <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-fg m-0">
              <span className="text-muted"># HTTP Endpoint</span>{'\n'}
              <span className="text-accent font-bold">POST</span> /api/contact{'\n'}
              <span className="text-accent">Content-Type:</span> application/json{'\n\n'}
              {`{
  `}<span className="text-ok">"name"</span>:    <span className="text-muted">// who you are</span>,
  <span className="text-ok">"email"</span>:   <span className="text-muted">// reply destination</span>,
  <span className="text-ok">"subject"</span>: <span className="text-muted">// inquiry scope</span>,
  <span className="text-ok">"message"</span>: <span className="text-muted">// system specifications</span>
{`}`}
            </pre>
          </div>

          {/* Direct channels */}
          <div className="bg-surface border border-line p-4 space-y-3">
            <div className="text-muted text-[11px] uppercase tracking-wider border-b border-line pb-2">
              {t('contact.channels')}
            </div>

            <div className="space-y-2">
              {/* Email */}
              <div className="flex items-center justify-between p-2 bg-surface-2 border border-line">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 text-fg hover:text-accent truncate"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="truncate">{personal.email}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 hover:text-accent text-muted ml-2"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-ok" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href={personal.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-surface-2 border border-line hover:border-ok text-fg hover:text-ok transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-ok" />
                  <span>WhatsApp: {personal.whatsapp}</span>
                </div>
                <span className="text-[10px] text-ok px-1 border border-ok/40">Direct</span>
              </a>

              {/* LinkedIn */}
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-surface-2 border border-line hover:border-accent text-fg hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-accent" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-[10px] text-muted">in/toufikul-islamts</span>
              </a>

              {/* GitHub */}
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-surface-2 border border-line hover:border-accent text-fg hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-accent" />
                  <span>GitHub Profile</span>
                </div>
                <span className="text-[10px] text-muted">@codewithToufikul</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Live Form + Response Console */}
        <div className="lg:col-span-7 bg-surface border border-line p-5 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
            {/* Honeypot field (hidden from visual users) */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-muted text-[11px] uppercase tracking-wider mb-1">
                  {t('contact.nameLabel')} <span className="text-crit">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full p-2.5 bg-bg border border-line text-fg focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-muted text-[11px] uppercase tracking-wider mb-1">
                  {t('contact.emailLabel')} <span className="text-crit">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full p-2.5 bg-bg border border-line text-fg focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-muted text-[11px] uppercase tracking-wider mb-1">
                {t('contact.subjectLabel')}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contact.subjectPlaceholder')}
                className="w-full p-2.5 bg-bg border border-line text-fg focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-muted text-[11px] uppercase tracking-wider mb-1">
                {t('contact.messageLabel')} <span className="text-crit">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full p-2.5 bg-bg border border-line text-fg focus:border-accent focus:outline-none transition-colors resize-y"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 bg-accent text-bg font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                    <span>{t('contact.sendingBtn')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('contact.submitBtn')}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Form Response Stream Log */}
          {responseLog && (
            <div
              className={`p-3 border font-mono text-xs leading-relaxed animate-in slide-in-from-top-1 ${
                responseLog.status >= 200 && responseLog.status < 300
                  ? 'border-ok/40 bg-ok/5 text-ok'
                  : 'border-crit/40 bg-crit/5 text-crit'
              }`}
            >
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-dashed border-current/30 text-[11px]">
                <span>
                  HTTP/1.1 {responseLog.status} {responseLog.statusText}
                </span>
                <span>Latency: {responseLog.elapsed}ms</span>
              </div>
              <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
                {JSON.stringify(responseLog.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
