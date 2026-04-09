# Security Controls & HIPAA Alignment — VPEd

VPEd handles sensitive patient information, making security configuration a critical part of the Salesforce implementation. This document outlines the required security controls, role-based access model, and HIPAA compliance requirements.

---

## ⚠️ Critical Pre-Launch Requirements

Salesforce is **not** HIPAA-compliant by default. The following steps are **mandatory** before any patient data is entered into the system:

1. **Sign a Business Associate Agreement (BAA)** with Salesforce
2. **Provision the correct edition** — either Salesforce Health Cloud or Salesforce with Shield
3. **Complete HIPAA training** for all staff with system access
4. **Document your security configuration** for audit readiness

> Reference: [Salesforce HIPAA Compliance Site](https://compliance.salesforce.com/en/categories/hipaa)

---

## Role-Based Access Model

Four profiles are configured to match VPEd's staffing structure:

### VPEd Admin
Full system access. Only role permitted to:
- View patient identity fields (`Patient_ID__c`, `Specialty_Area__c`)
- Export patient records
- Edit clinical session outcome notes
- Approve testimonials
- Manage user accounts and profiles

### Staff (Matcher)
Operational access for daily matching and scheduling tasks:
- Create and edit Match records
- Create and edit Session records
- View student Contact records and statuses
- View (not export) aggregate patient availability
- Cannot view patient identity or outcome notes

### Supervisor
Clinical oversight access:
- View and edit Session outcome notes for their linked sessions
- View supervisor-level Feedback records
- Cannot view patient identity or export records

### Read-Only (Reporting)
Dashboard and reporting access only:
- View all dashboards and standard reports
- Cannot create, edit, or delete any records
- Cannot access patient object at all

---

## Field-Level Security Configuration

Configure the following field restrictions in **Setup → Object Manager → Field-Level Security**:

| Object | Field | Admin | Staff | Supervisor | Read-Only |
|--------|-------|-------|-------|------------|-----------|
| Patient | `Patient_ID__c` | Read/Write | Hidden | Hidden | Hidden |
| Patient | `Specialty_Area__c` | Read/Write | Hidden | Hidden | Hidden |
| Patient | `Availability__c` | Read/Write | Read | Hidden | Hidden |
| Session | `Outcome_Notes__c` | Read/Write | Hidden | Read/Write | Hidden |
| Feedback | `Supervisor_Rating__c` | Read/Write | Read | Read/Write | Read |
| Feedback | `Testimonial__c` | Read/Write | Read | Read | Hidden |
| Feedback | `Testimonial_Approved__c` | Read/Write | Hidden | Hidden | Hidden |

---

## HIPAA Compliance Checklist

| Control | Requirement | Status |
|---------|-------------|--------|
| Business Associate Agreement | Must be signed with Salesforce before go-live | ⚠️ Required |
| Correct Edition | Health Cloud or Salesforce Shield required for PHI | ⚠️ Required |
| Audit Trail | Login history and field-level audit logging | ✅ Built-in (enable in Setup) |
| Encryption at Rest | Platform Encryption (Shield) or standard encryption | ✅ Available |
| Encryption in Transit | TLS 1.2+ enforced by Salesforce | ✅ Default |
| MFA | Multi-factor authentication for all users | ✅ Configurable — must enable |
| Session Timeout | Auto-logout after inactivity | ✅ Set to 30 min recommended |
| IP Restrictions | Restrict login to trusted IPs | ✅ Configurable |
| Data De-identification | Patient object uses internal ID — no name stored | ✅ By design |
| Minimum Necessary Access | Field-level security limits PHI exposure | ✅ Configured per role |

---

## Data De-Identification Strategy

To minimize PHI exposure within the system:

- **No patient names** are stored in Salesforce — only an internal auto-generated `Patient_ID__c`
- **PHI is not propagated** to the Match record — only a lookup to the Patient object exists
- **Session outcome notes** are access-controlled and not visible to students or read-only users
- **Testimonials** require explicit staff approval before any use outside the system
- **Feedback records** use session and match lookups, never direct patient identifiers

---

## Recommended Security Settings in Salesforce Setup

```
Setup → Session Settings
  - Session Timeout: 30 minutes
  - Lock sessions to the IP address from which they originated: Enabled

Setup → Login Access Policies
  - Require MFA for all internal users: Enabled

Setup → Password Policies
  - Minimum password length: 12 characters
  - Password complexity: Must mix letters, numbers, and symbols
  - Maximum password age: 90 days

Setup → Login IP Ranges (on each profile)
  - Restrict to VPEd office IP ranges where applicable

Setup → Field Audit Trail (Shield add-on)
  - Enable on: Patient__c, Session__c, Feedback__c
  - Retention: 10 years (HIPAA requirement)
```

---

## References

- Salesforce HIPAA Compliance: https://compliance.salesforce.com/en/categories/hipaa
- HIPAA Journal — Is Salesforce HIPAA Compliant?: https://www.hipaajournal.com/is-salesforce-hipaa-compliant/
- AccountableHQ — Salesforce BAA Guide: https://www.accountablehq.com/post/salesforce-hipaa-compliance-baa-requirements-and-a-step-by-step-setup-guide
