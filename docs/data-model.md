# Salesforce Data Model — VPEd

This document details the full Salesforce object model mapped to VPEd's operational data.

---

## Object Overview

```
Account (University)
  └── Contact (Student / Supervisor)
        └── Match (Custom)
              ├── Patient (Custom)
              ├── Session (Custom)
              │     └── Feedback (Custom)
              └── Supervisor (Contact lookup)
```

---

## Standard Objects

### Account — Universities

Represents each university partner in VPEd's network.

| Field | Type | Values / Notes |
|-------|------|----------------|
| `Name` | Text | University name |
| `Program_Status__c` | Picklist | Prospect, Contacted, Demo Scheduled, Pilot, Active, Renewal, Inactive |
| `Pilot_Start_Date__c` | Date | Date university entered Pilot stage |
| `Renewal_Date__c` | Date | Contract renewal date — triggers 30-day alert |
| `Active_Student_Count__c` | Roll-up | Count of active linked student Contacts |
| `Primary_Supervisor__c` | Lookup (Contact) | Main supervisor contact at the university |

---

### Contact — Students & Supervisors

Both students and supervisors are stored as Contacts, differentiated by the `Role__c` field.

| Field | Type | Values / Notes |
|-------|------|----------------|
| `AccountId` | Lookup (Account) | Links Contact to their university |
| `Role__c` | Picklist | Student, Supervisor |
| `Student_Status__c` | Picklist | Inquiry, Applied, Qualified, Awaiting Match, Matched, Scheduled, Completed |
| `Match_Date__c` | Date | Date student was matched to a patient |
| `Sessions_Completed__c` | Roll-up | Count of completed Session records |
| `Days_Awaiting_Match__c` | Formula | Used by scheduled flow to trigger 7-day alert |

---

## Custom Objects

### Patient (`Patient__c`)

Stores de-identified patient records. PHI is intentionally minimized.

| Field | Type | Values / Notes |
|-------|------|----------------|
| `Patient_ID__c` | Auto Number | Internal de-identified ID — no name stored |
| `Availability__c` | Text Area | Days/times available for sessions |
| `Specialty_Area__c` | Picklist | Condition or educational specialty |
| `Matched_Student__c` | Lookup (Contact) | Current matched student |
| `Total_Sessions__c` | Roll-up | Count of linked Session records |

> ⚠️ **Access restricted to Admin profile only.** Patient identity fields are protected via field-level security.

---

### Match (`Match__c`)

Junction object linking a student, patient, and supervisor for a specific engagement.

| Field | Type | Values / Notes |
|-------|------|----------------|
| `Student__c` | Lookup (Contact) | The matched student |
| `Patient__c` | Lookup (Patient__c) | The matched patient |
| `Supervisor__c` | Lookup (Contact) | The supervising clinician |
| `Match_Date__c` | Date | Date the match was confirmed |
| `Match_Status__c` | Picklist | Pending, Active, Completed, Cancelled |

> PHI is **not** stored on the Match record directly — the Patient lookup keeps sensitive data isolated behind field-level security.

---

### Session (`Session__c`)

Tracks each scheduled student-patient interaction.

| Field | Type | Values / Notes |
|-------|------|----------------|
| `Match__c` | Master-Detail (Match__c) | Parent match record |
| `Scheduled_DateTime__c` | DateTime | Planned session time |
| `Status__c` | Picklist | Scheduled, In Progress, Completed, Cancelled |
| `Duration_Minutes__c` | Number | Session length |
| `Outcome_Notes__c` | Long Text Area | Clinical notes — access-controlled by profile |
| `Feedback_Submitted__c` | Checkbox | Whether feedback survey was completed |

---

### Feedback (`Feedback__c`)

Captures post-session ratings from all three parties.

| Field | Type | Values / Notes |
|-------|------|----------------|
| `Session__c` | Master-Detail (Session__c) | Parent session record |
| `Student_Rating__c` | Number (1–5) | Student self-rating |
| `Patient_Rating__c` | Number (1–5) | Patient satisfaction rating |
| `Supervisor_Rating__c` | Number (1–5) | Supervisor assessment rating |
| `Testimonial__c` | Long Text Area | Free-text testimonial from patient or student |
| `Testimonial_Approved__c` | Checkbox | Staff approval flag before marketing use |

---

## Data Flow

```
1. University (Account) is created → status set to Prospect
2. Student (Contact) is linked to University → status Inquiry
3. Staff reviews application → status moves to Qualified
4. Flow Builder creates Match Review task automatically
5. Staff creates Match record → links Student + Patient + Supervisor
6. Student status → Matched; Session record created → Scheduled
7. Session is conducted → status → Completed
8. Flow Builder sends Feedback survey to all three parties
9. Feedback records created and linked to Session
10. Approved testimonials flagged for marketing review
```

---

## Reporting Fields

These fields power the operational dashboards:

| Report | Key Fields Used |
|--------|----------------|
| Students by status | `Contact.Student_Status__c` |
| Students awaiting match | `Contact.Days_Awaiting_Match__c > 7` |
| Active universities | `Account.Program_Status__c = 'Active'` |
| Sessions completed | `Session__c.Status__c = 'Completed'` |
| Average feedback score | `AVG(Feedback__c.Student_Rating__c)` |
