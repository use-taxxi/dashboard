import React from 'react';

export default function CalendarWidget({ data }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 32, color: '#2ecc71', position: 'relative' }}>
          <svg width="36" height="36" fill="none" stroke="#2ecc71" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4"/><path d="M3 9h18"/></svg>
          <span style={{ position: 'absolute', top: -6, right: -6, background: '#e74c3c', color: '#fff', borderRadius: '50%', fontSize: 13, padding: '2px 7px', fontWeight: 700 }}>{data.deadlines}</span>
        </span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>Compliance Calendar</div>
          <div style={{ color: '#888', fontSize: 13 }}>Upcoming Deadlines</div>
        </div>
      </div>
      <button style={{ marginTop: 16, padding: '8px 18px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>View Calendar</button>
    </div>
  );
} 