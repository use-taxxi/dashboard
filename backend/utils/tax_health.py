# Utility function for calculating tax health score and breakdown

def calculate_tax_health_score(answers):
    score = 0
    breakdown = []

    # Step 1: Business Structure & State Compliance (20 Points)
    step1 = 0
    if answers.get('entity_type_selected'): step1 += 5; breakdown.append({'label': 'Entity type selected', 'points': 5})
    else: breakdown.append({'label': 'Entity type selected', 'points': 0})
    if answers.get('state_of_incorporation'): step1 += 5; breakdown.append({'label': 'State of incorporation provided', 'points': 5})
    else: breakdown.append({'label': 'State of incorporation provided', 'points': 0})
    if answers.get('multi_state_ops_declared'): step1 += 5; breakdown.append({'label': 'Multi-state operations declared & states listed', 'points': 5})
    else: breakdown.append({'label': 'Multi-state operations declared & states listed', 'points': 0})
    if answers.get('registered_in_required_states'): step1 += 5; breakdown.append({'label': 'Registered in required states for tax purposes', 'points': 5})
    else: breakdown.append({'label': 'Registered in required states for tax purposes', 'points': 0})
    if answers.get('multi_state_ops_declared') and not answers.get('registered_in_required_states'): step1 -= 5; breakdown.append({'label': 'Operating in multiple states but no registrations', 'points': -5})
    score += step1

    # Step 2: Financial & Payroll Setup (20 Points)
    step2 = 0
    if answers.get('accounting_system_connected'): step2 += 5; breakdown.append({'label': 'Accounting system connected', 'points': 5})
    else: breakdown.append({'label': 'Accounting system connected', 'points': 0})
    if answers.get('payroll_provider_connected'): step2 += 5; breakdown.append({'label': 'Payroll provider connected or reports uploaded', 'points': 5})
    else: breakdown.append({'label': 'Payroll provider connected or reports uploaded', 'points': 0})
    if answers.get('revenue_expense_data_provided'): step2 += 5; breakdown.append({'label': 'Revenue & expense data provided', 'points': 5})
    else: breakdown.append({'label': 'Revenue & expense data provided', 'points': 0})
    if answers.get('payroll_tax_compliance'): step2 += 5; breakdown.append({'label': 'Payroll tax compliance confirmed', 'points': 5})
    elif answers.get('payroll_provider_connected'): step2 += 5; breakdown.append({'label': 'Payroll exists but compliance is unclear', 'points': 5})
    else: breakdown.append({'label': 'Payroll tax compliance confirmed', 'points': 0})
    score += step2

    # Step 3: Tax & Compliance Risk Assessment (40 Points)
    step3 = 0
    if answers.get('federal_return_filed'): step3 += 10; breakdown.append({'label': 'Filed federal business tax return', 'points': 10})
    elif answers.get('federal_return_required') and not answers.get('federal_return_filed') and not answers.get('federal_extension_filed'): step3 -= 10; breakdown.append({'label': 'Required but not filed & no extension', 'points': -10})
    elif answers.get('federal_extension_filed'): step3 += 5; breakdown.append({'label': 'Filed extension', 'points': 5})
    if answers.get('state_return_filed'): step3 += 5; breakdown.append({'label': 'Filed state tax returns (if required)', 'points': 5})
    elif answers.get('state_return_required') and not answers.get('state_return_filed'): step3 -= 5; breakdown.append({'label': 'Required but not filed (state)', 'points': -5})
    if answers.get('estimated_payments_made'): step3 += 5; breakdown.append({'label': 'Made estimated tax payments if taxes are due', 'points': 5})
    elif answers.get('expected_to_owe') and not answers.get('estimated_payments_made'): step3 -= 5; breakdown.append({'label': 'Expected to owe but no payments made', 'points': -5})
    if answers.get('no_outstanding_notices'): step3 += 5; breakdown.append({'label': 'No outstanding IRS/state tax notices', 'points': 5})
    elif answers.get('unresolved_notices_exist'): step3 -= 5; breakdown.append({'label': 'Unresolved notices exist', 'points': -5})
    if answers.get('tracking_randd_credits'): step3 += 5; breakdown.append({'label': 'Tracking R&D credits (if applicable)', 'points': 5})
    elif answers.get('randd_activities_exist') and not answers.get('tracking_randd_credits'): step3 -= 5; breakdown.append({'label': 'R&D activities exist but not claimed', 'points': -5})
    if answers.get('tracking_sales_tax_nexus'): step3 += 5; breakdown.append({'label': 'Tracking sales tax nexus (if applicable)', 'points': 5})
    score += step3

    # Clamp score between 0 and 80
    score = max(0, min(score, 80))
    normalized_score = round((score / 80) * 100)

    # Status and description
    if normalized_score >= 85:
        status = 'Excellent Tax Health'
        desc = 'No significant risks detected.'
    elif normalized_score >= 70:
        status = 'Good Tax Health'
        desc = 'Some risks but manageable.'
    elif normalized_score >= 50:
        status = 'Moderate Tax Health'
        desc = 'Several risks need attention.'
    else:
        status = 'Poor Tax Health'
        desc = 'Significant risks detected. Immediate action recommended.'

    return {
        'score': normalized_score,
        'status': status,
        'desc': desc,
        'breakdown': breakdown
    } 