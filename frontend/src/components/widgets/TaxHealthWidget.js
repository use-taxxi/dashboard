import React from 'react';

// Helper to calculate score and breakdown
function calculateTaxHealthScore(answers) {
  let score = 0;
  const breakdown = [];

  // Step 1: Business Structure & State Compliance (20 Points)
  let step1 = 0;
  if (answers.entityTypeSelected) { step1 += 5; breakdown.push({ label: 'Entity type selected', points: 5 }); }
  else { breakdown.push({ label: 'Entity type selected', points: 0 }); }
  if (answers.stateOfIncorporationProvided) { step1 += 5; breakdown.push({ label: 'State of incorporation provided', points: 5 }); }
  else { breakdown.push({ label: 'State of incorporation provided', points: 0 }); }
  if (answers.multiStateOpsDeclared) { step1 += 5; breakdown.push({ label: 'Multi-state operations declared & states listed', points: 5 }); }
  else { breakdown.push({ label: 'Multi-state operations declared & states listed', points: 0 }); }
  if (answers.registeredInRequiredStates) { step1 += 5; breakdown.push({ label: 'Registered in required states for tax purposes', points: 5 }); }
  else { breakdown.push({ label: 'Registered in required states for tax purposes', points: 0 }); }
  if (answers.multiStateOpsDeclared && !answers.registeredInRequiredStates) { step1 -= 5; breakdown.push({ label: 'Operating in multiple states but no registrations', points: -5 }); }
  score += step1;

  // Step 2: Financial & Payroll Setup (20 Points)
  let step2 = 0;
  if (answers.accountingSystemConnected) { step2 += 5; breakdown.push({ label: 'Accounting system connected', points: 5 }); }
  else { breakdown.push({ label: 'Accounting system connected', points: 0 }); }
  if (answers.payrollProviderConnected) { step2 += 5; breakdown.push({ label: 'Payroll provider connected or reports uploaded', points: 5 }); }
  else { breakdown.push({ label: 'Payroll provider connected or reports uploaded', points: 0 }); }
  if (answers.revenueExpenseDataProvided) { step2 += 5; breakdown.push({ label: 'Revenue & expense data provided', points: 5 }); }
  else { breakdown.push({ label: 'Revenue & expense data provided', points: 0 }); }
  if (answers.payrollTaxComplianceConfirmed) { step2 += 5; breakdown.push({ label: 'Payroll tax compliance confirmed', points: 5 }); }
  else if (answers.payrollProviderConnected) { step2 += 5; breakdown.push({ label: 'Payroll exists but compliance is unclear', points: 5 }); }
  else { breakdown.push({ label: 'Payroll tax compliance confirmed', points: 0 }); }
  score += step2;

  // Step 3: Tax & Compliance Risk Assessment (40 Points)
  let step3 = 0;
  if (answers.federalReturnFiled) { step3 += 10; breakdown.push({ label: 'Filed federal business tax return', points: 10 }); }
  else if (answers.federalReturnRequired && !answers.federalReturnFiled && !answers.federalExtensionFiled) { step3 -= 10; breakdown.push({ label: 'Required but not filed & no extension', points: -10 }); }
  else if (answers.federalExtensionFiled) { step3 += 5; breakdown.push({ label: 'Filed extension', points: 5 }); }
  if (answers.stateReturnFiled) { step3 += 5; breakdown.push({ label: 'Filed state tax returns (if required)', points: 5 }); }
  else if (answers.stateReturnRequired && !answers.stateReturnFiled) { step3 -= 5; breakdown.push({ label: 'Required but not filed (state)', points: -5 }); }
  if (answers.estimatedPaymentsMade) { step3 += 5; breakdown.push({ label: 'Made estimated tax payments if taxes are due', points: 5 }); }
  else if (answers.expectedToOwe && !answers.estimatedPaymentsMade) { step3 -= 5; breakdown.push({ label: 'Expected to owe but no payments made', points: -5 }); }
  if (answers.noOutstandingNotices) { step3 += 5; breakdown.push({ label: 'No outstanding IRS/state tax notices', points: 5 }); }
  else if (answers.unresolvedNoticesExist) { step3 -= 5; breakdown.push({ label: 'Unresolved notices exist', points: -5 }); }
  if (answers.trackingRAndDCredits) { step3 += 5; breakdown.push({ label: 'Tracking R&D credits (if applicable)', points: 5 }); }
  else if (answers.rAndDActivitiesExist && !answers.trackingRAndDCredits) { step3 -= 5; breakdown.push({ label: 'R&D activities exist but not claimed', points: -5 }); }
  if (answers.trackingSalesTaxNexus) { step3 += 5; breakdown.push({ label: 'Tracking sales tax nexus (if applicable)', points: 5 }); }
  score += step3;

  // Clamp score between 0 and 80
  score = Math.max(0, Math.min(score, 80));

  // Map score to 0-100 scale
  const normalizedScore = Math.round((score / 80) * 100);

  // Status and description
  let status = 'Good Tax Health';
  let desc = 'Some risks but manageable';
  if (normalizedScore >= 85) {
    status = 'Excellent Tax Health';
    desc = 'No significant risks detected.';
  } else if (normalizedScore >= 70) {
    status = 'Good Tax Health';
    desc = 'Some risks but manageable.';
  } else if (normalizedScore >= 50) {
    status = 'Moderate Tax Health';
    desc = 'Several risks need attention.';
  } else {
    status = 'Poor Tax Health';
    desc = 'Significant risks detected. Immediate action recommended.';
  }

  return { normalizedScore, status, desc, breakdown };
}

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

// Example answers for demonstration (replace with real data/props)
const exampleAnswers = {
  entityTypeSelected: true,
  stateOfIncorporationProvided: true,
  multiStateOpsDeclared: true,
  registeredInRequiredStates: false,
  accountingSystemConnected: true,
  payrollProviderConnected: true,
  revenueExpenseDataProvided: true,
  payrollTaxComplianceConfirmed: false,
  federalReturnFiled: true,
  federalReturnRequired: true,
  federalExtensionFiled: false,
  stateReturnFiled: true,
  stateReturnRequired: true,
  estimatedPaymentsMade: true,
  expectedToOwe: false,
  noOutstandingNotices: true,
  unresolvedNoticesExist: false,
  trackingRAndDCredits: false,
  rAndDActivitiesExist: true,
  trackingSalesTaxNexus: true,
};

export default function TaxHealthWidget({ data, answers = exampleAnswers }) {
  // answers can be passed as a prop or use exampleAnswers
  const { normalizedScore, status, desc, breakdown } = calculateTaxHealthScore(answers);

  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Gauge score={normalizedScore} />
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