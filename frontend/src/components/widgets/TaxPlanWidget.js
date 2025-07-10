import React from 'react';

export default function TaxPlanWidget({ data }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Tax Plan Generation</div>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>${data.amount.toLocaleString()}</div>
        <span style={{ color: '#2ecc71', background: '#eafaf1', borderRadius: 8, padding: '2px 10px', fontSize: 14, fontWeight: 500, marginLeft: 4 }}>
          {data.savings > 0 ? '+' : ''}{data.savings.toLocaleString()}
        </span>
        <div style={{ color: '#888', fontSize: 13, margin: '8px 0 16px 0' }}>Estimated federal tax due with current plan</div>
        <button style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>Explore Plan</button>
      </div>
      <div style={{ marginTop: 24, textAlign: 'center', color: '#bbb', fontSize: 14, border: '1px dashed #ccc', borderRadius: 8, padding: 16 }}>
        potential animated icon here
      </div>
    </div>
  );
} 