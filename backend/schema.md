
## **Supabase Database Schema**

### 1. **users**
Stores user/company information.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | uuid (PK)    | User ID (matches Supabase Auth)    |
| company_name     | text         | Name of the company                |
| email            | text         | User email                         |
| created_at       | timestamp    | Account creation time              |

---

### 2. **tax_health_answers**
Stores answers to the tax health questionnaire for each user.

| Column Name                  | Type         | Description                                 |
|------------------------------|--------------|---------------------------------------------|
| id                           | bigint (PK)  | Primary key                                 |
| user_id                      | uuid (FK)    | References users.id                         |
| entity_type_selected         | boolean      | Widget answer fields                        |
| state_of_incorporation       | text         | State name                                  |
| multi_state_ops_declared     | boolean      | ...                                         |
| registered_in_required_states| boolean      | ...                                         |
| accounting_system_connected  | boolean      | ...                                         |
| payroll_provider_connected   | boolean      | ...                                         |
| revenue_expense_data_provided| boolean      | ...                                         |
| payroll_tax_compliance       | boolean      | ...                                         |
| federal_return_filed         | boolean      | ...                                         |
| federal_extension_filed      | boolean      | ...                                         |
| federal_return_required      | boolean      | ...                                         |
| state_return_filed           | boolean      | ...                                         |
| state_return_required        | boolean      | ...                                         |
| estimated_payments_made      | boolean      | ...                                         |
| expected_to_owe              | boolean      | ...                                         |
| no_outstanding_notices       | boolean      | ...                                         |
| unresolved_notices_exist     | boolean      | ...                                         |
| tracking_randd_credits       | boolean      | ...                                         |
| randd_activities_exist       | boolean      | ...                                         |
| tracking_sales_tax_nexus     | boolean      | ...                                         |
| created_at                   | timestamp    | When the answers were submitted             |
| updated_at                   | timestamp    | Last update                                 |

---

### 3. **tax_plan**
Stores tax plan data per user.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | bigint (PK)  | Primary key                        |
| user_id          | uuid (FK)    | References users.id                |
| amount           | numeric      | Tax plan amount                    |
| savings          | numeric      | Tax savings                        |
| created_at       | timestamp    |                                    |

---

### 4. **rnd_credits**
Stores R&D credits data per user.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | bigint (PK)  | Primary key                        |
| user_id          | uuid (FK)    | References users.id                |
| amount           | numeric      | R&D credit amount                  |
| badge            | text         | Badge (e.g., "Potential")          |
| created_at       | timestamp    |                                    |

---

### 5. **data_import**
Tracks data import connections per user.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | bigint (PK)  | Primary key                        |
| user_id          | uuid (FK)    | References users.id                |
| connected        | int          | Number of connected sources        |
| total            | int          | Total possible sources             |
| percent          | int          | Percent connected                  |
| created_at       | timestamp    |                                    |

---

### 6. **compliance**
Tracks compliance alerts per user.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | bigint (PK)  | Primary key                        |
| user_id          | uuid (FK)    | References users.id                |
| alerts           | int          | Total alerts                       |
| critical         | int          | Critical alerts                    |
| warning          | int          | Warning alerts                     |
| compliant        | int          | Compliant items                    |
| created_at       | timestamp    |                                    |

---

### 7. **calendar**
Tracks calendar deadlines per user.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | bigint (PK)  | Primary key                        |
| user_id          | uuid (FK)    | References users.id                |
| deadlines        | int          | Number of deadlines                |
| created_at       | timestamp    |                                    |

---

### 8. **advisors**
Stores advisor info per user.

| Column Name      | Type         | Description                        |
|------------------|--------------|------------------------------------|
| id               | bigint (PK)  | Primary key                        |
| user_id          | uuid (FK)    | References users.id                |
| name             | text         | Advisor name                       |
| role             | text         | Advisor role                       |
| created_at       | timestamp    |                                    |

---
