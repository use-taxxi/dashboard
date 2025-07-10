import React, { useEffect, useState } from 'react';
import TaxPlanWidget from './widgets/TaxPlanWidget';
import TaxHealthWidget from './widgets/TaxHealthWidget';
import RAndDCreditsWidget from './widgets/RAndDCreditsWidget';
import DataImportWidget from './widgets/DataImportWidget';
import ComplianceWidget from './widgets/ComplianceWidget';
import CalendarWidget from './widgets/CalendarWidget';
import AdvisoryWidget from './widgets/AdvisoryWidget';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/summary')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <main style={{ padding: '32px 40px', background: '#f7f8fa', flex: 1 }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <TaxPlanWidget data={data.tax_plan} />
        <TaxHealthWidget data={data.tax_health} />
        <RAndDCreditsWidget data={data.rnd_credits} />
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <DataImportWidget data={data.data_import} />
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <ComplianceWidget data={data.compliance} />
        <CalendarWidget data={data.calendar} />
        <AdvisoryWidget data={data.advisors} />
      </div>
    </main>
  );
} 