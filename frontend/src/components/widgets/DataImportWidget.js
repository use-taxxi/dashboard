import React from 'react';

export default function DataImportWidget({ data }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Data Import & Onboarding</div>
        <div style={{ fontWeight: 700, fontSize: 20 }}>{data.connected}/{data.total} Data Sources Connected
          <span style={{ color: '#2ecc71', background: '#eafaf1', borderRadius: 8, padding: '2px 10px', fontSize: 14, fontWeight: 500, marginLeft: 8 }}>{data.percent}% Complete</span>
        </div>
        <div style={{ color: '#888', fontSize: 13, margin: '8px 0 16px 0' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        <div style={{ background: '#eee', borderRadius: 8, height: 8, width: 200, margin: '8px 0' }}>
          <div style={{ background: '#2ecc71', height: 8, borderRadius: 8, width: `${data.percent}%`, transition: 'width 0.5s' }}></div>
        </div>
      </div>
      <button style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer', marginLeft: 24 }}>
        Connect Data <span style={{ marginLeft: 6, fontSize: 16 }}>⭳</span>
      </button>
    </div>
  );
} 