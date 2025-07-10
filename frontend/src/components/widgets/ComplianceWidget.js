import React from 'react';

export default function ComplianceWidget({ data }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>Compliance & Risk Flagging</div>
        <span style={{ marginLeft: 16, color: '#fff', background: '#e74c3c', borderRadius: 8, padding: '2px 10px', fontSize: 14, fontWeight: 500 }}>1 Critical</span>
        <button style={{ marginLeft: 'auto', padding: '4px 14px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>View All</button>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <div style={{ flex: 1, background: '#ffeaea', borderRadius: 8, padding: 12, textAlign: 'center' }}>
          <div style={{ color: '#e74c3c', fontWeight: 700, fontSize: 18 }}>Critical</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{data.critical}</div>
          <div style={{ color: '#bbb', fontSize: 13, marginTop: 8 }}>potential animated icon here</div>
        </div>
        <div style={{ flex: 1, background: '#fffbe6', borderRadius: 8, padding: 12, textAlign: 'center' }}>
          <div style={{ color: '#f5c542', fontWeight: 700, fontSize: 18 }}>Warning</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{data.warning}</div>
          <div style={{ color: '#bbb', fontSize: 13, marginTop: 8 }}>potential animated icon here</div>
        </div>
        <div style={{ flex: 1, background: '#eafaf1', borderRadius: 8, padding: 12, textAlign: 'center' }}>
          <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: 18 }}>Compliant</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{data.compliant}</div>
          <div style={{ color: '#bbb', fontSize: 13, marginTop: 8 }}>potential animated icon here</div>
        </div>
      </div>
    </div>
  );
} 