import React from 'react';

const navItems = [
  'Dashboard',
  'Tax Planning',
  'Tax Health',
  'R&D Credits',
  'Compliance',
  'Calendar',
  'Tax Tips',
  'Chat Support',
  'Help & Support',
  'Settings',
];

export default function Sidebar() {
  return (
    <aside style={{ width: 220, background: '#093d1d', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 40, letterSpacing: 2 }}>Taxxi</div>
      <nav style={{ width: '100%' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map(item => (
            <li key={item} style={{ padding: '16px 32px', cursor: 'pointer', fontSize: 16, borderLeft: '4px solid transparent', transition: 'background 0.2s' }}
              onMouseOver={e => e.currentTarget.style.background = '#145c2c'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 