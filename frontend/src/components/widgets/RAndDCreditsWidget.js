import React from 'react';

export default function RAndDCreditsWidget({ data }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>R&D Tax Credits</div>
      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>${data.amount.toLocaleString()}</div>
      <span style={{ color: '#2563eb', background: '#e0eaff', borderRadius: 8, padding: '2px 10px', fontSize: 14, fontWeight: 500, marginLeft: 4 }}>
        {data.badge}
      </span>
      <div style={{ color: '#888', fontSize: 13, margin: '8px 0 16px 0' }}>Estimated available R&D Credits</div>
      <button style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>See Credits</button>
    </div>
  );
} 