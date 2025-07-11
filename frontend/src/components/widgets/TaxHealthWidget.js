import React, { useEffect, useState } from 'react';

function Gauge({ score }) {
  // Simple SVG circular gauge
  const radius = 28;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} style={{ marginRight: 16 }}>
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#f5c542"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text x="50%" y="54%" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#222">{score}</text>
    </svg>
  );
}

export default function TaxHealthWidget() {
  const [taxHealth, setTaxHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace '123' with the actual logged-in user's ID
    fetch('http://localhost:5000/api/tax-health-answers?user_id=a1b2c3d4-e5f6-4a3b-8c7d-9e0f1a2b3c4d')
      .then(res => {
        if (!res.ok) throw new Error('No data');
        return res.json();
      })
      .then(data => {
        if (data && data.tax_health) {
          setTaxHealth(data.tax_health);
        } else {
          setTaxHealth(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setTaxHealth(null);
        setLoading(false);
        setError('No tax health data found. Please fill out the form to complete your information.');
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!taxHealth) {
    if (error) alert(error);
    return null;
  }

  const { score, status, desc, breakdown } = taxHealth;

  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Gauge score={score} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>Tax Health Score</div>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#f5c542' }}>{status}</div>
          <div style={{ color: '#888', fontSize: 13 }}>{desc}</div>
        </div>
      </div>
      <button style={{ marginTop: 16, padding: '8px 18px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>View Details</button>
      <div style={{ marginTop: 16, fontSize: 13, color: '#444' }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Score Breakdown:</div>
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {breakdown.map((item, idx) => (
            <li key={idx} style={{ color: item.points < 0 ? '#e74c3c' : '#222' }}>{item.label}: <b>{item.points > 0 ? '+' : ''}{item.points}</b></li>
          ))}
        </ul>
      </div>
    </div>
  );
} 