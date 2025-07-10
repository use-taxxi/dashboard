import React from 'react';

export default function AdvisoryWidget({ data }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Tax Advisory & Consultation</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
        {data.map((advisor, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4v2H4v-2z"/></svg>
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{advisor.name}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{advisor.role}</div>
            </div>
            <span style={{ marginLeft: 'auto', width: 10, height: 10, borderRadius: '50%', background: '#2ecc71', display: 'inline-block' }}></span>
          </div>
        ))}
      </div>
      <button style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>See Chat & Book Session</button>
    </div>
  );
} 