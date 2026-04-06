'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
export default function ResponsibleGamblingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '40px 24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Important</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Responsible Gambling</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 14 }}>Gambling should always be fun. Please play responsibly.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ background: RED, borderRadius: 14, padding: '24px 28px', marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 4 }}>1-800-GAMBLER</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>National Problem Gambling Helpline — free, confidential, 24/7</div>
        </div>
        {[
          { title: 'Must Be 21+', content: 'You must be 21 years of age or older to participate in sports betting in the United States. BetAndPlayUSA strictly enforces this requirement. We will reject any submissions from users we believe to be underage.' },
          { title: 'Set Limits', content: 'Set deposit limits, wagering limits, and time limits with your sportsbook before you start. All major sportsbooks offer responsible gambling tools in their account settings. Use them.' },
          { title: 'Signs of Problem Gambling', content: 'Gambling more than you can afford to lose, chasing losses, borrowing money to gamble, gambling affecting your relationships or work, and feeling unable to stop are all signs of problem gambling. Help is available.' },
          { title: 'Self-Exclusion', content: 'Every major sportsbook offers self-exclusion programmes. You can also self-exclude from all licensed operators in your state through your state gaming commission. This is a powerful tool — use it if you need it.' },
          { title: 'Resources', content: 'National Council on Problem Gambling: ncpgambling.org. Gamblers Anonymous: gamblersanonymous.org. National Problem Gambling Helpline: 1-800-522-4700. Crisis Text Line: Text HOME to 741741.' },
        ].map(function(section) {
          return (
            <div key={section.title} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px 28px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: NAVY, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.3 }}>{section.title}</h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, margin: 0, fontSize: 15 }}>{section.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
