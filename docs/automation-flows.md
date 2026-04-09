# Flow Builder Automations — VPEd

All six automated workflows are built using Salesforce Flow Builder. They eliminate manual staff tasks and ensure consistent communication across the student-patient matching lifecycle.

---

## Flow 1 — Match Review Task on Qualification

**Type:** Record-Triggered Flow

**Trigger:** Contact record updated — `Student_Status__c` changes to `Qualified`

**Action:**
1. Create a new Task record
   - Subject: "Match Review — [Student Name]"
   - Status: Not Started
   - Priority: High
   - Assigned To: Staff matching queue
   - Due Date: Today + 3 days
2. Send email notification to the queue owner

**Purpose:** Ensures no qualified student waits without a match review being initiated. Removes the need for staff to manually monitor the student pipeline.

---

## Flow 2 — Feedback Survey on Session Completion

**Type:** Record-Triggered Flow

**Trigger:** Session record updated — `Status__c` changes to `Completed`

**Actions:**
1. Set `Feedback_Submitted__c` = False on the Session record
2. Send email to the linked Student (Contact) with feedback survey link
3. Send email to the linked Patient (via Match → Patient lookup) with satisfaction survey
4. Send email to the linked Supervisor with assessment form
5. Create three Feedback records (one per party) with `Session__c` lookup pre-populated

**Purpose:** Systematizes post-session data collection. Ensures every completed session generates outcome data for quality improvement and marketing.

---

## Flow 3 — Pilot Onboarding Notification

**Type:** Record-Triggered Flow

**Trigger:** Account record updated — `Program_Status__c` changes to `Pilot`

**Actions:**
1. Send notification to the VPEd onboarding team (Chatter post or email)
2. Create a Task checklist for the assigned account manager:
   - Task 1: "Send pilot welcome package"
   - Task 2: "Schedule kickoff call with university supervisor"
   - Task 3: "Confirm student enrollment list"
   - Task 4: "Verify HIPAA training completion"

**Purpose:** Ensures every university entering Pilot receives a consistent onboarding experience without relying on staff memory.

---

## Flow 4 — 7-Day Awaiting Match Escalation

**Type:** Scheduled Flow (runs daily)

**Criteria:** Contact records where:
- `Student_Status__c` = `Awaiting Match`
- `Match_Date__c` is null
- `Days_Awaiting_Match__c` >= 7

**Actions:**
1. Send email alert to VPEd administrator with student name, university, and days waiting
2. Create a high-priority Task assigned to the administrator: "Escalate match — [Student Name] waiting 7+ days"
3. Post Chatter notification on the Contact record

**Purpose:** Prevents students from falling through the cracks during the matching process. Gives administrators a daily prompt to intervene in stalled cases.

---

## Flow 5 — University Renewal Alert

**Type:** Scheduled Flow (runs daily)

**Criteria:** Account records where:
- `Program_Status__c` = `Active`
- `Renewal_Date__c` is within 30 days of today

**Actions:**
1. Create Task for the account manager: "Initiate renewal conversation — [University Name]"
2. Attach summary of session count and average feedback score to the task description
3. Send email to the account manager with renewal details

**Purpose:** Ensures no contract lapses due to missed renewal windows. Gives account managers lead time to prepare data-driven renewal conversations.

---

## Flow 6 — Testimonial Approval Flag

**Type:** Record-Triggered Flow

**Trigger:** Feedback record updated — `Testimonial_Approved__c` changes to `True`

**Actions:**
1. Send email notification to VPEd marketing contact with testimonial text
2. Create Task: "Review approved testimonial for use — [Session Date]"
3. Update parent Session record with a `Has_Approved_Testimonial__c` checkbox = True

**Purpose:** Creates a governed pipeline for testimonial content. Prevents unreviewed patient or student quotes from being used in marketing without staff approval.

---

## Flow Summary Table

| # | Flow Name | Trigger Type | Key Action |
|---|-----------|-------------|------------|
| 1 | Match Review Task | Record-triggered | Creates staff task on student qualification |
| 2 | Feedback Survey | Record-triggered | Sends 3 surveys on session completion |
| 3 | Pilot Onboarding | Record-triggered | Creates checklist on university pilot entry |
| 4 | 7-Day Match Alert | Scheduled (daily) | Escalates stalled student matches |
| 5 | Renewal Alert | Scheduled (daily) | Notifies account manager 30 days before renewal |
| 6 | Testimonial Approval | Record-triggered | Flags testimonials for marketing review |

---

## Implementation Notes

- All flows should be built and tested in a **Salesforce Sandbox** before deploying to production.
- Use **Flow Builder's Debug tool** to simulate trigger conditions without modifying live records.
- Scheduled flows should run during off-peak hours (e.g., 6:00 AM EST) to reduce system load.
- Email templates referenced in these flows should be created in **Salesforce Email Templates** before activating the flows.
- All flows should be documented in the **Salesforce Setup Audit Trail** after deployment.
