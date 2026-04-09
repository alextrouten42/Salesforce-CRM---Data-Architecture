const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "VPEd Salesforce CRM";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const NAVY   = "0B1F3A";  // dominant dark
const TEAL   = "028090";  // primary accent
const MINT   = "02C39A";  // secondary accent
const SILVER = "E8EDF2";  // light surfaces
const WHITE  = "FFFFFF";
const MUTED  = "8FA0B0";
const TEXT   = "1A2E42";

// ── HELPERS ──────────────────────────────────────────────────────────────────
function makeShadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.12 };
}
function card(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: WHITE },
    line: { color: "D6DDE4", width: 0.5 },
    shadow: makeShadow()
  });
}
function accentCard(slide, x, y, w, h, accent) {
  card(slide, x, y, w, h);
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.07, h,
    fill: { color: accent },
    line: { color: accent, width: 0 }
  });
}
function sectionLabel(slide, text, x, y, color) {
  slide.addText(text, {
    x, y, w: 4, h: 0.22,
    fontSize: 8, bold: true, color: color || TEAL,
    charSpacing: 3, fontFace: "Calibri"
  });
}
function dot(slide, x, y, color) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: 0.1, h: 0.1,
    fill: { color }, line: { color, width: 0 }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Decorative teal bar left
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: TEAL }, line: { color: TEAL } });

  // Subtle grid dots top-right
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      s.addShape(pres.shapes.OVAL, {
        x: 5.8 + col * 0.42, y: 0.25 + row * 0.42, w: 0.05, h: 0.05,
        fill: { color: "1D3A56" }, line: { color: "1D3A56" }
      });
    }
  }

  // Mint accent line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.8, w: 1.1, h: 0.04, fill: { color: MINT }, line: { color: MINT } });

  s.addText("VIRTUAL PATIENT EDUCATION", {
    x: 0.55, y: 1.1, w: 8.5, h: 0.45,
    fontSize: 10, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 4, margin: 0
  });
  s.addText("Salesforce CRM\nImplementation Blueprint", {
    x: 0.55, y: 1.95, w: 8.5, h: 1.6,
    fontSize: 44, color: WHITE, bold: true, fontFace: "Calibri", lineSpacingMultiple: 1.1
  });
  s.addText("Data architecture · Lifecycle management · Automation · Security", {
    x: 0.55, y: 3.7, w: 8.5, h: 0.4,
    fontSize: 13, color: MUTED, fontFace: "Calibri", italic: true
  });

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.2, w: 10, h: 0.425, fill: { color: "071628" }, line: { color: "071628" } });
  s.addText("TECH 489 · Field Experience in Technology · Davenport University", {
    x: 0.55, y: 5.23, w: 9, h: 0.35,
    fontSize: 9, color: MUTED, fontFace: "Calibri"
  });
  s.addText("Salesforce — Score 4.55 / 5.0", {
    x: 0.55, y: 5.23, w: 9, h: 0.35,
    fontSize: 9, color: MINT, fontFace: "Calibri", align: "right"
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — BUSINESS PROBLEM
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: SILVER };

  // Dark left panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.6, h: 5.625, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.6, y: 0, w: 0.06, h: 5.625, fill: { color: TEAL }, line: { color: TEAL } });

  s.addText("THE\nCHALLENGE", {
    x: 0.35, y: 1.2, w: 3.0, h: 1.5,
    fontSize: 34, color: WHITE, bold: true, fontFace: "Calibri", lineSpacingMultiple: 1.05
  });
  s.addText("VPEd operates across universities, students, supervisors, and patients — without a centralized system to track them.", {
    x: 0.35, y: 2.85, w: 2.9, h: 1.5,
    fontSize: 12, color: MUTED, fontFace: "Calibri", lineSpacingMultiple: 1.5
  });

  // Problem cards right side
  const problems = [
    { icon: "⛔", title: "No centralized data", desc: "Fragmented information across disconnected systems" },
    { icon: "🔁", title: "Manual processes", desc: "Staff reliance on manual work increases errors" },
    { icon: "📊", title: "Limited analytics", desc: "No reporting capabilities to inform decisions" },
    { icon: "🔒", title: "Compliance risk", desc: "Sensitive patient data lacks formal protection" },
  ];

  problems.forEach((p, i) => {
    const y = 0.3 + i * 1.25;
    accentCard(s, 3.85, y, 5.85, 1.05, TEAL);
    s.addText(p.icon, { x: 4.05, y: y + 0.25, w: 0.5, h: 0.5, fontSize: 20, margin: 0 });
    s.addText(p.title, { x: 4.65, y: y + 0.15, w: 4.8, h: 0.32, fontSize: 13, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
    s.addText(p.desc, { x: 4.65, y: y + 0.52, w: 4.8, h: 0.38, fontSize: 11, color: MUTED, fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — SALESFORCE OBJECT MODEL
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("SALESFORCE DATA MODEL", { x: 0.5, y: 0.17, w: 6, h: 0.38, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });
  s.addText("How VPEd's data maps to Salesforce objects", { x: 0.5, y: 0.17, w: 9.1, h: 0.38, fontSize: 12, color: MUTED, fontFace: "Calibri", align: "right", margin: 0 });

  const objects = [
    { label: "ACCOUNTS", name: "Universities", color: TEAL,   fields: ["Program status (7 stages)", "Pilot start / Renewal date", "Active student count"], x: 0.3,  y: 0.95 },
    { label: "CONTACTS", name: "Students & Supervisors", color: "3B82F6",  fields: ["Role (Student / Supervisor)", "Status picklist (7 stages)", "Linked university (Account)"], x: 3.55, y: 0.95 },
    { label: "CUSTOM",   name: "Patients", color: "7C3AED",   fields: ["De-identified patient ID", "Availability windows", "Matched student lookup"], x: 6.8,  y: 0.95 },
    { label: "CUSTOM",   name: "Matches", color: "D97706",    fields: ["Student + Patient + Supervisor", "Match date & status", "Auto-creates on qualification"], x: 0.3,  y: 3.0  },
    { label: "CUSTOM",   name: "Sessions", color: "DC2626",   fields: ["Linked to Match record", "Date, duration, status", "Outcome notes (access-controlled)"], x: 3.55, y: 3.0  },
    { label: "CUSTOM",   name: "Feedback", color: "DB2777",   fields: ["Student / Patient / Supervisor ratings", "Testimonial + approval flag", "Linked to completed Session"], x: 6.8,  y: 3.0  },
  ];

  objects.forEach(o => {
    card(s, o.x, o.y, 3.0, 2.35);
    s.addShape(pres.shapes.RECTANGLE, { x: o.x, y: o.y, w: 3.0, h: 0.52, fill: { color: o.color }, line: { color: o.color } });
    s.addText(o.label, { x: o.x + 0.12, y: o.y + 0.08, w: 2.0, h: 0.2, fontSize: 7, color: WHITE, bold: true, fontFace: "Calibri", charSpacing: 2, margin: 0 });
    s.addText(o.name, { x: o.x + 0.12, y: o.y + 0.27, w: 2.6, h: 0.22, fontSize: 13, color: WHITE, bold: true, fontFace: "Calibri", margin: 0 });
    o.fields.forEach((f, fi) => {
      dot(s, o.x + 0.17, o.y + 0.72 + fi * 0.52 + 0.04, o.color);
      s.addText(f, { x: o.x + 0.35, y: o.y + 0.65 + fi * 0.52, w: 2.55, h: 0.38, fontSize: 11, color: TEXT, fontFace: "Calibri", margin: 0 });
    });
  });

  // Flow arrow row
  const arrowY = 2.2;
  [0.3, 3.55].forEach(x => {
    s.addShape(pres.shapes.LINE, { x: x + 3.0, y: arrowY + 0.175, w: 0.55, h: 0, line: { color: TEAL, width: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: x + 3.42, y: arrowY + 0.04, w: 0.14, h: 0.14, line: { color: TEAL, width: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: x + 3.42, y: arrowY + 0.31, w: 0.14, h: -0.14, line: { color: TEAL, width: 1.5 } });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — LIFECYCLE STAGES
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("LIFECYCLE PIPELINE", { x: 0.5, y: 0.17, w: 6, h: 0.38, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });

  // University pipeline
  s.addText("University pipeline", { x: 0.3, y: 0.88, w: 4, h: 0.3, fontSize: 11, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
  const uniStages = [
    { name: "Prospect",      color: "94A3B8" },
    { name: "Contacted",     color: "3B82F6" },
    { name: "Demo",          color: "06B6D4" },
    { name: "Pilot ⚡",      color: "F59E0B" },
    { name: "Active",        color: MINT },
    { name: "Renewal ⚡",    color: "7C3AED" },
    { name: "Inactive",      color: "94A3B8" },
  ];
  uniStages.forEach((st, i) => {
    const x = 0.3 + i * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.22, w: 1.22, h: 0.65, fill: { color: st.color }, line: { color: st.color } });
    s.addText(st.name, { x, y: 1.22, w: 1.22, h: 0.65, fontSize: 10, color: WHITE, bold: true, fontFace: "Calibri", align: "center", valign: "middle" });
    if (i < uniStages.length - 1) {
      s.addShape(pres.shapes.LINE, { x: x + 1.22, y: 1.545, w: 0.13, h: 0, line: { color: "C0C8D4", width: 1 } });
    }
  });

  // Student pipeline
  s.addText("Student status pipeline", { x: 0.3, y: 2.15, w: 5, h: 0.3, fontSize: 11, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
  const stuStages = [
    { name: "Inquiry",         color: "94A3B8" },
    { name: "Applied",         color: "3B82F6" },
    { name: "Qualified ⚡",    color: TEAL },
    { name: "Awaiting ⏰",     color: "F59E0B" },
    { name: "Matched",         color: "7C3AED" },
    { name: "Scheduled",       color: "DC2626" },
    { name: "Completed ⚡",    color: MINT },
  ];
  stuStages.forEach((st, i) => {
    const x = 0.3 + i * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: 1.22, h: 0.65, fill: { color: st.color }, line: { color: st.color } });
    s.addText(st.name, { x, y: 2.5, w: 1.22, h: 0.65, fontSize: 10, color: WHITE, bold: true, fontFace: "Calibri", align: "center", valign: "middle" });
    if (i < stuStages.length - 1) {
      s.addShape(pres.shapes.LINE, { x: x + 1.22, y: 2.825, w: 0.13, h: 0, line: { color: "C0C8D4", width: 1 } });
    }
  });

  // Legend
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 3.42, w: 9.4, h: 0.05, fill: { color: SILVER }, line: { color: SILVER } });
  s.addText("⚡ = Automation triggered at this stage     ⏰ = 7-day escalation alert if no match assigned", {
    x: 0.3, y: 3.55, w: 9.4, h: 0.32,
    fontSize: 10, color: MUTED, fontFace: "Calibri", italic: true
  });

  // Detail cards
  const details = [
    { stage: "Qualified → Auto-task", body: "When a student reaches Qualified, Flow Builder creates a Match Review task and assigns it to the staff queue automatically." },
    { stage: "Awaiting Match → 7-day alert", body: "A scheduled flow runs daily. If a student has been Awaiting Match for 7+ days, an admin alert is triggered for manual intervention." },
    { stage: "Completed → Survey", body: "When a Session is marked Completed, Salesforce sends feedback surveys to the student, patient, and supervisor." },
  ];
  details.forEach((d, i) => {
    accentCard(s, 0.3 + i * 3.23, 3.95, 3.05, 1.4, MINT);
    s.addText(d.stage, { x: 0.5 + i * 3.23, y: 4.02, w: 2.65, h: 0.32, fontSize: 11, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
    s.addText(d.body, { x: 0.5 + i * 3.23, y: 4.37, w: 2.65, h: 0.88, fontSize: 10, color: MUTED, fontFace: "Calibri", lineSpacingMultiple: 1.4, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — AUTOMATION FLOWS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: MINT }, line: { color: MINT } });
  s.addText("FLOW BUILDER AUTOMATIONS", { x: 0.42, y: 0.28, w: 6, h: 0.38, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });
  s.addText("Six automated workflows that eliminate manual work", { x: 0.42, y: 0.62, w: 9, h: 0.32, fontSize: 14, color: WHITE, fontFace: "Calibri" });

  const flows = [
    { trigger: "Student → Qualified",        action: "Creates Match Review task → assigned to staff queue",        icon: "📋", col: 0, row: 0 },
    { trigger: "Session → Completed",         action: "Sends feedback survey to student, patient & supervisor",     icon: "📧", col: 1, row: 0 },
    { trigger: "University → Pilot",          action: "Notifies onboarding team → creates setup task checklist",    icon: "🔔", col: 0, row: 1 },
    { trigger: "Awaiting Match → 7+ days",    action: "Escalation alert to administrator for manual intervention",  icon: "⚠️", col: 1, row: 1 },
    { trigger: "Renewal date within 30 days", action: "Creates renewal task with contract summary for account mgr", icon: "📅", col: 0, row: 2 },
    { trigger: "Feedback testimonial approved", action: "Flags record for marketing review and archives to session", icon: "⭐", col: 1, row: 2 },
  ];

  flows.forEach(f => {
    const x = 0.42 + f.col * 4.85;
    const y = 1.1 + f.row * 1.5;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 1.28,
      fill: { color: "0D2B45" },
      line: { color: "1A4060", width: 0.5 },
      shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.28, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText(f.icon, { x: x + 0.15, y: y + 0.12, w: 0.5, h: 0.5, fontSize: 18, margin: 0 });
    s.addText("TRIGGER", { x: x + 0.72, y: y + 0.1, w: 3.7, h: 0.2, fontSize: 7, color: TEAL, bold: true, fontFace: "Calibri", charSpacing: 2, margin: 0 });
    s.addText(f.trigger, { x: x + 0.72, y: y + 0.3, w: 3.7, h: 0.3, fontSize: 11, color: WHITE, bold: true, fontFace: "Calibri", margin: 0 });
    s.addText("ACTION  →  " + f.action, { x: x + 0.15, y: y + 0.72, w: 4.3, h: 0.45, fontSize: 10, color: MUTED, fontFace: "Calibri", lineSpacingMultiple: 1.35, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — SECURITY & HIPAA
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("SECURITY & HIPAA ALIGNMENT", { x: 0.5, y: 0.17, w: 7, h: 0.38, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });

  // Left: access control
  s.addText("Access control by role", { x: 0.3, y: 0.9, w: 4.3, h: 0.32, fontSize: 12, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
  const roles = [
    { role: "VPEd Admin",        perms: "Full access — patient identity, export, all records" },
    { role: "Staff (matcher)",    perms: "Create/edit matches, sessions, view student records" },
    { role: "Supervisor",         perms: "View/edit session notes, see supervisor-level feedback" },
    { role: "Read-only (reports)", perms: "Dashboards and aggregate reports only" },
  ];
  roles.forEach((r, i) => {
    accentCard(s, 0.3, 1.28 + i * 1.02, 4.3, 0.9, TEAL);
    s.addText(r.role, { x: 0.5, y: 1.36 + i * 1.02, w: 3.9, h: 0.28, fontSize: 12, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
    s.addText(r.perms, { x: 0.5, y: 1.66 + i * 1.02, w: 3.9, h: 0.35, fontSize: 10, color: MUTED, fontFace: "Calibri", margin: 0 });
  });

  // Right: HIPAA checklist
  s.addText("HIPAA compliance checklist", { x: 5.0, y: 0.9, w: 4.7, h: 0.32, fontSize: 12, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
  const checks = [
    { item: "Business Associate Agreement (BAA) signed",  status: "Required — not auto-included", color: "D97706" },
    { item: "Salesforce Shield or Health Cloud edition",   status: "Required before going live",    color: "D97706" },
    { item: "Audit trail — login & data access logging",   status: "Enabled in all editions",       color: MINT },
    { item: "Encryption at rest and in transit",           status: "Enabled in all editions",       color: MINT },
    { item: "MFA enforced for all user accounts",          status: "Configurable — must enable",    color: MINT },
    { item: "Field-level security on patient records",     status: "Custom-configured per profile", color: MINT },
  ];
  checks.forEach((c, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.0, y: 1.28 + i * 0.71, w: 4.7, h: 0.6,
      fill: { color: SILVER }, line: { color: "D6DDE4", width: 0.5 }
    });
    dot(s, 5.15, 1.36 + i * 0.71 + 0.15, c.color);
    s.addText(c.item, { x: 5.35, y: 1.3 + i * 0.71, w: 4.1, h: 0.28, fontSize: 11, color: TEXT, fontFace: "Calibri", bold: true, margin: 0 });
    s.addText(c.status, { x: 5.35, y: 1.58 + i * 0.71, w: 4.1, h: 0.22, fontSize: 9, color: c.color === MINT ? "0F766E" : "92400E", fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — DASHBOARDS & METRICS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: SILVER };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("OPERATIONAL DASHBOARDS", { x: 0.5, y: 0.17, w: 7, h: 0.38, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });
  s.addText("Real-time visibility into VPEd program health", { x: 0.5, y: 0.17, w: 9.1, h: 0.38, fontSize: 12, color: MUTED, fontFace: "Calibri", align: "right", margin: 0 });

  // KPI tiles
  const kpis = [
    { val: "14",  label: "Active Universities",     sub: "+ 3 in pilot",        color: TEAL },
    { val: "9",   label: "Awaiting Match",           sub: "2 flagged > 7 days",  color: "D97706" },
    { val: "62",  label: "Sessions This Month",      sub: "↑ 18% vs last month", color: "3B82F6" },
    { val: "4.7", label: "Avg. Feedback Score",      sub: "Out of 5.0",          color: MINT },
  ];
  kpis.forEach((k, i) => {
    const x = 0.3 + i * 2.38;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.88, w: 2.2, h: 1.18, fill: { color: WHITE }, line: { color: "D6DDE4", width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.88, w: 2.2, h: 0.08, fill: { color: k.color }, line: { color: k.color } });
    s.addText(k.val, { x, y: 0.96, w: 2.2, h: 0.62, fontSize: 38, bold: true, color: k.color, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText(k.label, { x, y: 1.6, w: 2.2, h: 0.22, fontSize: 10, color: TEXT, fontFace: "Calibri", align: "center", bold: true, margin: 0 });
    s.addText(k.sub, { x, y: 1.82, w: 2.2, h: 0.18, fontSize: 9, color: MUTED, fontFace: "Calibri", align: "center", margin: 0 });
  });

  // Student status bar chart
  card(s, 0.3, 2.22, 5.3, 3.08);
  s.addText("Students by status", { x: 0.5, y: 2.35, w: 4.8, h: 0.28, fontSize: 11, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
  const bars = [
    { label: "Completed",      val: 40, pct: 1.0,  color: MINT },
    { label: "Matched",        val: 20, pct: 0.5,  color: "7C3AED" },
    { label: "Scheduled",      val: 15, pct: 0.38, color: "DC2626" },
    { label: "Awaiting match", val: 9,  pct: 0.23, color: "D97706" },
    { label: "Qualified",      val: 7,  pct: 0.18, color: TEAL },
    { label: "Applied",        val: 10, pct: 0.25, color: "3B82F6" },
  ];
  bars.forEach((b, i) => {
    const y = 2.75 + i * 0.38;
    s.addText(b.label, { x: 0.4, y, w: 1.35, h: 0.3, fontSize: 9, color: MUTED, fontFace: "Calibri", align: "right", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.85, y: y + 0.07, w: 3.45, h: 0.18, fill: { color: "E2E8F0" }, line: { color: "E2E8F0" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.85, y: y + 0.07, w: 3.45 * b.pct, h: 0.18, fill: { color: b.color }, line: { color: b.color } });
    s.addText(String(b.val), { x: 5.35, y, w: 0.3, h: 0.3, fontSize: 9, color: TEXT, fontFace: "Calibri", valign: "middle", margin: 0 });
  });

  // University pipeline chart
  card(s, 5.8, 2.22, 3.9, 3.08);
  s.addText("University pipeline", { x: 6.0, y: 2.35, w: 3.5, h: 0.28, fontSize: 11, bold: true, color: TEXT, fontFace: "Calibri", margin: 0 });
  const upipe = [
    { label: "Prospect",  val: 9,  pct: 0.9,  color: "94A3B8" },
    { label: "Contacted", val: 6,  pct: 0.6,  color: "3B82F6" },
    { label: "Demo",      val: 4,  pct: 0.4,  color: "06B6D4" },
    { label: "Pilot",     val: 3,  pct: 0.3,  color: "D97706" },
    { label: "Active",    val: 14, pct: 1.0,  color: MINT },
    { label: "Renewal",   val: 2,  pct: 0.2,  color: "7C3AED" },
  ];
  upipe.forEach((b, i) => {
    const y = 2.75 + i * 0.38;
    s.addText(b.label, { x: 5.9, y, w: 1.15, h: 0.3, fontSize: 9, color: MUTED, fontFace: "Calibri", align: "right", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.15, y: y + 0.07, w: 2.2, h: 0.18, fill: { color: "E2E8F0" }, line: { color: "E2E8F0" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.15, y: y + 0.07, w: 2.2 * b.pct, h: 0.18, fill: { color: b.color }, line: { color: b.color } });
    s.addText(String(b.val), { x: 9.4, y, w: 0.25, h: 0.3, fontSize: 9, color: TEXT, fontFace: "Calibri", valign: "middle", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — IMPLEMENTATION ROADMAP
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("IMPLEMENTATION ROADMAP", { x: 0.5, y: 0.17, w: 7, h: 0.38, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });

  const phases = [
    {
      phase: "Phase 1", title: "Foundation", time: "Weeks 1–4",
      color: TEAL,
      items: ["Sign Salesforce BAA", "Provision correct edition (Health Cloud / Shield)", "Build Accounts, Contacts, custom objects", "Configure field-level security & profiles"]
    },
    {
      phase: "Phase 2", title: "Automation", time: "Weeks 5–8",
      color: "3B82F6",
      items: ["Deploy Flow Builder automations (6 workflows)", "Set up 7-day escalation alerts", "Automate feedback surveys on session complete", "Configure pilot onboarding notifications"]
    },
    {
      phase: "Phase 3", title: "Dashboards", time: "Weeks 9–10",
      color: "7C3AED",
      items: ["Build student-by-status report", "Build university pipeline report", "Create sessions-completed dashboard", "Train staff on reporting interface"]
    },
    {
      phase: "Phase 4", title: "Optimization", time: "Ongoing",
      color: MINT,
      items: ["Monitor bottlenecks from dashboards", "Expand automation as needs grow", "Review compliance posture quarterly", "Collect staff feedback for iteration"]
    },
  ];

  // Timeline bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.15, w: 9.4, h: 0.06, fill: { color: SILVER }, line: { color: SILVER } });
  phases.forEach((p, i) => {
    const x = 0.3 + i * 2.38;
    dot(s, x + 1.1, 1.12, p.color);

    card(s, x, 1.35, 2.2, 3.98);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.35, w: 2.2, h: 0.55, fill: { color: p.color }, line: { color: p.color } });
    s.addText(p.phase, { x: x + 0.12, y: 1.38, w: 1.2, h: 0.22, fontSize: 8, color: WHITE, bold: true, fontFace: "Calibri", charSpacing: 2, margin: 0 });
    s.addText(p.time, { x: x + 0.12, y: 1.38, w: 1.95, h: 0.22, fontSize: 8, color: WHITE, fontFace: "Calibri", align: "right", margin: 0 });
    s.addText(p.title, { x: x + 0.12, y: 1.6, w: 1.95, h: 0.25, fontSize: 14, color: WHITE, bold: true, fontFace: "Calibri", margin: 0 });
    p.items.forEach((item, ii) => {
      dot(s, x + 0.18, 2.08 + ii * 0.72 + 0.06, p.color);
      s.addText(item, { x: x + 0.36, y: 2.02 + ii * 0.72, w: 1.72, h: 0.6, fontSize: 10, color: TEXT, fontFace: "Calibri", lineSpacingMultiple: 1.3, margin: 0 });
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 — CONCLUSION
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: TEAL }, line: { color: TEAL } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.9, w: 10, h: 0.725, fill: { color: "071628" }, line: { color: "071628" } });

  // Decorative dots
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      s.addShape(pres.shapes.OVAL, {
        x: 6.5 + col * 0.42, y: 0.25 + row * 0.42, w: 0.05, h: 0.05,
        fill: { color: "1D3A56" }, line: { color: "1D3A56" }
      });
    }
  }

  s.addText("RECOMMENDATION", { x: 0.45, y: 0.8, w: 6, h: 0.28, fontSize: 9, color: MINT, bold: true, fontFace: "Calibri", charSpacing: 3, margin: 0 });
  s.addText("Adopt Salesforce as\nVPEd's CRM platform.", { x: 0.45, y: 1.1, w: 9.2, h: 1.4, fontSize: 38, color: WHITE, bold: true, fontFace: "Calibri", lineSpacingMultiple: 1.05 });

  const bullets = [
    { icon: "✅", text: "Scored 4.55 / 5.0 — highest of four platforms evaluated" },
    { icon: "✅", text: "Custom objects fully model VPEd's unique student-patient workflow" },
    { icon: "✅", text: "Flow Builder automates 6 critical processes without manual effort" },
    { icon: "✅", text: "HIPAA-aligned security controls with proper edition + BAA" },
    { icon: "✅", text: "Real-time dashboards give staff operational visibility at a glance" },
  ];
  bullets.forEach((b, i) => {
    s.addText(b.icon + "  " + b.text, {
      x: 0.45, y: 2.65 + i * 0.43, w: 9.1, h: 0.38,
      fontSize: 12, color: i === 0 ? WHITE : MUTED, fontFace: "Calibri", margin: 0
    });
  });

  s.addText("Implement in phases · Invest in training · Monitor continuously", {
    x: 0.45, y: 4.93, w: 9.1, h: 0.35,
    fontSize: 10, color: MUTED, fontFace: "Calibri", italic: true
  });
}

pres.writeFile({ fileName: "/home/claude/VPEd_Salesforce_CRM.pptx" });
console.log("Done");
