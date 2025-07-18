import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';

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

// Question Mark Icon SVG
function QuestionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ position: 'absolute', top: 14, right: 18 }}>
      <circle cx="14" cy="14" r="13" fill="#fffbe6" stroke="#ffe066" strokeWidth="2" />
      <text x="14" y="19" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b8860b">?</text>
    </svg>
  );
}

// Modal component
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0006', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 480, boxShadow: '0 2px 16px #0002', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
        {children}
      </div>
    </div>
  );
}

// Form fields based on schema.md for tax_health_answers
const initialForm = {
  entity_type_selected: false,
  state_of_incorporation: '',
  multi_state_ops_declared: false,
  registered_in_required_states: false,
  accounting_system_connected: false,
  payroll_provider_connected: false,
  revenue_expense_data_provided: false,
  payroll_tax_compliance: false,
  federal_return_filed: false,
  federal_extension_filed: false,
  federal_return_required: false,
  state_return_filed: false,
  state_return_required: false,
  estimated_payments_made: false,
  expected_to_owe: false,
  no_outstanding_notices: false,
  unresolved_notices_exist: false,
  tracking_randd_credits: false,
  randd_activities_exist: false,
  tracking_sales_tax_nexus: false,
};

export default function TaxHealthWidget() {
  const { user } = useAuth();
  const [taxHealth, setTaxHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch('http://localhost:5000/api/tax-health-answers', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
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
  }, [user]);

  const handleFormChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg('');
    fetch('http://localhost:5000/api/tax-health-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setSubmitting(false);
        setSubmitMsg('Form submitted! Refreshing...');
        setShowModal(false);
        setTimeout(() => window.location.reload(), 1200);
      })
      .catch(() => {
        setSubmitting(false);
        setSubmitMsg('Submission failed.');
      });
  };

  if (!user) {
    return (
      <div style={{ flex: 1, background: '#fffbe6', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 16, color: '#b8860b', marginBottom: 8 }}>Please log in or sign up to view your tax health score.</div>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (!taxHealth) {
    return (
      <div style={{ flex: 1, background: '#fffbe6', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <QuestionIcon />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 16, color: '#b8860b', marginBottom: 8 }}>Fill out the form to view your tax health score.</div>
          <button onClick={() => setShowModal(true)} style={{ marginTop: 8, padding: '8px 18px', borderRadius: 8, border: '1px solid #b8860b', background: '#fffbe6', fontWeight: 600, color: '#b8860b', cursor: 'pointer' }}>Complete Form</button>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <h2 style={{ marginTop: 0 }}>Tax Health Questionnaire</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label><input type="checkbox" name="entity_type_selected" checked={form.entity_type_selected} onChange={handleFormChange} /> Entity type selected</label>
              <label>State of incorporation: <input type="text" name="state_of_incorporation" value={form.state_of_incorporation} onChange={handleFormChange} /></label>
              <label><input type="checkbox" name="multi_state_ops_declared" checked={form.multi_state_ops_declared} onChange={handleFormChange} /> Multi-state operations declared</label>
              <label><input type="checkbox" name="registered_in_required_states" checked={form.registered_in_required_states} onChange={handleFormChange} /> Registered in required states for tax purposes</label>
              <label><input type="checkbox" name="accounting_system_connected" checked={form.accounting_system_connected} onChange={handleFormChange} /> Accounting system connected</label>
              <label><input type="checkbox" name="payroll_provider_connected" checked={form.payroll_provider_connected} onChange={handleFormChange} /> Payroll provider connected or reports uploaded</label>
              <label><input type="checkbox" name="revenue_expense_data_provided" checked={form.revenue_expense_data_provided} onChange={handleFormChange} /> Revenue & expense data provided</label>
              <label><input type="checkbox" name="payroll_tax_compliance" checked={form.payroll_tax_compliance} onChange={handleFormChange} /> Payroll tax compliance confirmed</label>
              <label><input type="checkbox" name="federal_return_filed" checked={form.federal_return_filed} onChange={handleFormChange} /> Filed federal business tax return</label>
              <label><input type="checkbox" name="federal_extension_filed" checked={form.federal_extension_filed} onChange={handleFormChange} /> Filed federal extension</label>
              <label><input type="checkbox" name="federal_return_required" checked={form.federal_return_required} onChange={handleFormChange} /> Federal return required</label>
              <label><input type="checkbox" name="state_return_filed" checked={form.state_return_filed} onChange={handleFormChange} /> Filed state tax returns (if required)</label>
              <label><input type="checkbox" name="state_return_required" checked={form.state_return_required} onChange={handleFormChange} /> State return required</label>
              <label><input type="checkbox" name="estimated_payments_made" checked={form.estimated_payments_made} onChange={handleFormChange} /> Made estimated tax payments if taxes are due</label>
              <label><input type="checkbox" name="expected_to_owe" checked={form.expected_to_owe} onChange={handleFormChange} /> Expected to owe taxes</label>
              <label><input type="checkbox" name="no_outstanding_notices" checked={form.no_outstanding_notices} onChange={handleFormChange} /> No outstanding IRS/state tax notices</label>
              <label><input type="checkbox" name="unresolved_notices_exist" checked={form.unresolved_notices_exist} onChange={handleFormChange} /> Unresolved notices exist</label>
              <label><input type="checkbox" name="tracking_randd_credits" checked={form.tracking_randd_credits} onChange={handleFormChange} /> Tracking R&D credits (if applicable)</label>
              <label><input type="checkbox" name="randd_activities_exist" checked={form.randd_activities_exist} onChange={handleFormChange} /> R&D activities exist</label>
              <label><input type="checkbox" name="tracking_sales_tax_nexus" checked={form.tracking_sales_tax_nexus} onChange={handleFormChange} /> Tracking sales tax nexus (if applicable)</label>
            </div>
            <button type="submit" style={{ marginTop: 18, padding: '8px 18px', borderRadius: 8, border: '1px solid #b8860b', background: '#fffbe6', fontWeight: 600, color: '#b8860b', cursor: 'pointer' }} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
            {submitMsg && <div style={{ marginTop: 10, color: '#b8860b' }}>{submitMsg}</div>}
          </form>
        </Modal>
      </div>
    );
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