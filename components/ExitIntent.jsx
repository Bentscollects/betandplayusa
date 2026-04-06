'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(function() {
    const alreadySeen = sessionStorage.getItem('exit_intent_seen');
    if (alreadySeen) return;

    function handleMouseLeave(e) {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
        sessionStorage.setItem('exit_intent_seen', 'true');
      }
    }

    function handleMobileScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      if (scrollTop + winHeight >= docHeight - 100 && !dismissed) {
        const alreadyShown = sessionStorage.getItem('exit_intent_seen');
        if (!alreadyShown) {
          setTimeout(function() {
            setShow(true);
            sessionStorage.setItem('exit_intent_seen', 'true');
          }, 2000);
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleMobileScroll);

    return function() {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleMobileScroll);
    };
  }, [dismissed]);

  function dismiss() {
    setShow(false);
    setDismissed(true);
  }

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: WHITE, borderRadius: 20, maxWidth: 480, width: '100%', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
        <div style={{ background: NAVY, padding: '32px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
          <button onClick={dismiss} style={{ position: 'absolute', top: 14, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', color: WHITE, width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>x</button>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '4px 12px', marginBottom: 14 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Wait — before you go</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: WHITE, margin: '0 0 8px', textTransform: 'uppercase', lineHeight: 1.1 }}>Don&apos;t Miss Out On <span style={{ color: RED }}>Free Cash</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>Sign up with a top US sportsbook through us and earn a cash reward or free Telegram betting tips. Takes less than 5 minutes.</p>
          </div>
        </div>
        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <Link href="/activate" onClick={dismiss} style={{ display: 'block', background: RED, color: WHITE, textAlign: 'center', padding: '14px 20px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.3)' }}>
              Claim Cash Reward
            </Link>
            <Link href="/join" onClick={dismiss} style={{ display: 'block', background: '#f0f4ff', color: NAVY, textAlign: 'center', padding: '14px 20px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, border: '2px solid #e5e7eb' }}>
              Join Telegram Tips Group
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
            {['Must be 21+', 'New customers only', 'US states only'].map(function(t) {
              return <span key={t} style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>{t}</span>;
            })}
          </div>
          <button onClick={dismiss} style={{ width: '100%', background: 'none', border: 'none', color: '#9ca3af', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>No thanks, I don&apos;t want free rewards</button>
        </div>
      </div>
    </div>
  );
}
