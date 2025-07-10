import React from 'react';

export default function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 40px 16px 40px', background: '#fff', borderBottom: '1px solid #eee' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>Hello, COMPANY NAME</h1>
        <div style={{ color: '#888', fontSize: 16, marginTop: 4 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Notification Bell Icon */}
        <span style={{ fontSize: 24, cursor: 'pointer' }} title="Notifications">
          <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        </span>
        {/* User Profile Icon */}
        <span style={{ fontSize: 28, background: '#eee', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Profile">
          <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4v2H4v-2z"/></svg>
        </span>
      </div>
    </header>
  );
} 