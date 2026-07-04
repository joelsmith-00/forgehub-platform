import type React from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";
import {
  Trophy, CalendarCheck, GraduationCap, ClipboardList, TrendingUp, Star,
  Award, Medal, Upload, Download, Plus, CheckCircle2, XCircle, Mail,
  Users, BarChart3, Building2, Bell, Sparkles, Briefcase, MessageSquare, Handshake, FileText,
  UserRound, Flame, ThumbsUp, ThumbsDown, ShieldAlert,
} from "lucide-react";
import { StatCard, Panel, PageHeader, TableShell, Th, Td, Chip } from "./DashboardShell";
import {
  marksTrend, attendanceTrend, subjects, assignments, leaderboard, certificates,
  events, studentsList, departmentPerf, accessRequests, userGrowth, jobs,
  mentorshipRequests, discussions, successStories, departments,
} from "@/lib/mock-data";
import type { RoleKey } from "@/lib/roles";

const ORANGE = "#f15a22";
const GOLD = "#fcaf17";
const SEC = "#f58220";
const GRID = "rgba(255,255,255,0.08)";
const AXIS = "rgba(255,255,255,0.6)";

const tooltipStyle = {
  contentStyle: { background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff" },
  labelStyle: { color: "#fff", fontWeight: 600 },
};

/* ============================================================
   STUDENT PAGES
   ============================================================ */
function StudentHome() {
  return (
    <>
      <PageHeader title="Welcome back, Priya 👋" subtitle="Here's your academic snapshot for today." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={GraduationCap} label="Current CGPA" value="9.0" trend="+0.3 this sem" />
        <StatCard icon={CalendarCheck} label="Attendance" value="92%" accent="gold" trend="Above target" />
        <StatCard icon={Trophy} label="Rank" value="#3" accent="secondary" trend="Dept CSE" />
        <StatCard icon={Star} label="Leaderboard" value="#12" accent="gold" trend="Overall" />
        <StatCard icon={ClipboardList} label="Assignments" value="2" trend="Due this week" />
        <StatCard icon={CalendarCheck} label="Events" value="4" accent="secondary" trend="Upcoming" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Marks Trend" subtitle="GPA across semesters">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={marksTrend}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="term" stroke={AXIS} />
                <YAxis stroke={AXIS} domain={[6, 10]} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="gpa" stroke={ORANGE} strokeWidth={3} dot={{ fill: ORANGE, r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Attendance Trend" subtitle="Monthly attendance %">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={GOLD} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="month" stroke={AXIS} />
                <YAxis stroke={AXIS} domain={[70, 100]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="pct" stroke={GOLD} fill="url(#ag)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Upcoming Assignments">
          <TableShell>
            <thead><tr><Th>Subject</Th><Th>Title</Th><Th>Due</Th><Th>Status</Th></tr></thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.title}>
                  <Td>{a.subject}</Td><Td>{a.title}</Td><Td>{a.due}</Td>
                  <Td><Chip tone={a.status === "Pending" ? "warn" : a.status === "Graded" ? "success" : "info"}>{a.status}</Chip></Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
        <Panel title="Upcoming Events">
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={e.title} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--dsh-primary)]/20 text-[var(--dsh-primary)]">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{e.title}</div>
                  <div className="text-[11px] text-white/60">{e.date} · {e.venue}</div>
                </div>
                <Chip tone="info">{e.type}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function StudentProfile() {
  const fields = [
    ["Name", "Priya R."], ["Register No.", "CS22002"], ["Department", "Computer Science"],
    ["Batch", "2022 – 2026"], ["Email", "priya@college.edu"], ["Phone", "+91 98xxxxxx12"],
  ];
  return (
    <>
      <PageHeader title="My Profile" subtitle="Manage your personal & academic details." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Profile">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[var(--dsh-primary)] to-[var(--dsh-gold)] text-3xl font-black">P</div>
            <div className="mt-4 text-lg font-bold">Priya R.</div>
            <div className="text-xs text-white/60">CSE · 3rd Year</div>
            <button className="mt-4 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-xs font-semibold">Upload Photo</button>
          </div>
        </Panel>
        <div className="lg:col-span-2">
          <Panel title="Personal Details" action={<button className="rounded-md bg-[var(--dsh-primary)] px-3 py-1.5 text-xs font-semibold">Edit Profile</button>}>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px] uppercase tracking-wider text-white/50">{k}</div>
                  <div className="mt-1 text-sm font-medium">{v}</div>
                </div>
              ))}
              <div className="sm:col-span-2">
                <div className="text-[11px] uppercase tracking-wider text-white/50">Skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["React", "Python", "TensorFlow", "SQL", "System Design"].map((s) => <Chip key={s} tone="info">{s}</Chip>)}
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function StudentAttendance() {
  const pieData = [
    { name: "Attended", value: 249 }, { name: "Missed", value: 23 },
  ];
  return (
    <>
      <PageHeader title="Attendance" subtitle="Overall, subject-wise and monthly attendance breakdown." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Overall" value="92%" />
        <StatCard icon={CalendarCheck} label="This Month" value="94%" accent="gold" />
        <StatCard icon={CalendarCheck} label="Classes Attended" value="249" accent="secondary" />
        <StatCard icon={CalendarCheck} label="Total Classes" value="272" accent="white" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Overall Split">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={95} paddingAngle={4}>
                  <Cell fill={ORANGE} /><Cell fill="#3a3a3a" />
                </Pie>
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Subject-wise Attendance">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={subjects.map((s) => ({ subject: s.subject.split(" ")[0], pct: Math.round((s.attended / s.total) * 100) }))}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="subject" stroke={AXIS} />
                <YAxis stroke={AXIS} domain={[0, 100]} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="pct" fill={GOLD} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <div className="mt-6">
        <Panel title="Subject-wise Breakdown">
          <TableShell>
            <thead><tr><Th>Subject</Th><Th>Attended</Th><Th>Total</Th><Th>Percentage</Th></tr></thead>
            <tbody>
              {subjects.map((s) => {
                const pct = Math.round((s.attended / s.total) * 100);
                return (
                  <tr key={s.subject}>
                    <Td>{s.subject}</Td><Td>{s.attended}</Td><Td>{s.total}</Td>
                    <Td><Chip tone={pct >= 90 ? "success" : pct >= 75 ? "warn" : "danger"}>{pct}%</Chip></Td>
                  </tr>
                );
              })}
            </tbody>
          </TableShell>
        </Panel>
      </div>
    </>
  );
}

function StudentMarks() {
  return (
    <>
      <PageHeader title="Marks" subtitle="Internal, practical and semester marks." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={GraduationCap} label="Semester GPA" value="9.0" />
        <StatCard icon={GraduationCap} label="Internal Avg" value="46.0" accent="gold" />
        <StatCard icon={GraduationCap} label="Practical Avg" value="47.2" accent="secondary" />
        <StatCard icon={TrendingUp} label="Best Subject" value="DBMS · 92" accent="white" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Subject Comparison">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={subjects.map((s) => ({ subject: s.subject.split(" ")[0], internal: s.internal, practical: s.practical, semester: s.semester }))}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="subject" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Legend />
                <Bar dataKey="internal" fill={ORANGE} radius={[4, 4, 0, 0]} />
                <Bar dataKey="practical" fill={SEC} radius={[4, 4, 0, 0]} />
                <Bar dataKey="semester" fill={GOLD} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Semester Performance">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={marksTrend}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="term" stroke={AXIS} />
                <YAxis stroke={AXIS} domain={[6, 10]} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="gpa" stroke={ORANGE} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <div className="mt-6">
        <Panel title="All Subjects">
          <TableShell>
            <thead><tr><Th>Subject</Th><Th>Internal</Th><Th>Practical</Th><Th>Semester</Th></tr></thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.subject}><Td>{s.subject}</Td><Td>{s.internal}/50</Td><Td>{s.practical}/50</Td><Td className="font-semibold">{s.semester}/100</Td></tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      </div>
    </>
  );
}

function StudentAssignments() {
  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle="Track, submit and review your assignments."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Upload className="h-4 w-4" /> Upload</button>}
      />
      <Panel title="All Assignments">
        <TableShell>
          <thead><tr><Th>Subject</Th><Th>Title</Th><Th>Due Date</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.title}>
                <Td>{a.subject}</Td><Td>{a.title}</Td><Td>{a.due}</Td>
                <Td><Chip tone={a.status === "Pending" ? "warn" : a.status === "Graded" ? "success" : "info"}>{a.status}</Chip></Td>
                <Td>
                  <div className="flex gap-2">
                    <button className="rounded bg-white/10 px-2 py-1 text-[11px]"><Download className="inline h-3 w-3" /> Files</button>
                    <button className="rounded bg-[var(--dsh-primary)]/20 px-2 py-1 text-[11px] text-[var(--dsh-primary)]">Feedback</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function StudentLeaderboard() {
  return (
    <>
      <PageHeader title="Leaderboard" subtitle="See where you stand across campus." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Trophy} label="Overall Rank" value="#12" accent="gold" />
        <StatCard icon={Trophy} label="Dept Rank" value="#3" />
        <StatCard icon={Trophy} label="Weekly" value="#5" accent="secondary" />
        <StatCard icon={Trophy} label="Monthly" value="#8" accent="white" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {[
          { title: "Attendance Hero", desc: "95%+ attendance for 3 months", icon: CalendarCheck },
          { title: "Top Performer", desc: "9.0+ CGPA maintained", icon: Star },
          { title: "Assignment Warrior", desc: "All submissions on time", icon: Award },
        ].map((b) => (
          <div key={b.title} className="rounded-xl bg-[var(--dsh-card)] p-5 text-center shadow-card">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--dsh-primary)] to-[var(--dsh-gold)]">
              <b.icon className="h-6 w-6 text-white" />
            </div>
            <div className="mt-3 font-bold">{b.title}</div>
            <div className="text-xs text-white/60">{b.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Panel title="Top Ranks">
          <TableShell>
            <thead><tr><Th>Rank</Th><Th>Name</Th><Th>Dept</Th><Th>Score</Th></tr></thead>
            <tbody>
              {leaderboard.map((l) => (
                <tr key={l.rank} className={l.you ? "bg-[var(--dsh-primary)]/15" : ""}>
                  <Td className="font-bold">#{l.rank}</Td><Td>{l.name}</Td><Td>{l.dept}</Td><Td className="font-mono">{l.score}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      </div>
    </>
  );
}

function StudentAnalytics() {
  return (
    <>
      <PageHeader title="Performance Analytics" subtitle="AI-powered insights into your progress." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Performance Trend">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={marksTrend}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="term" stroke={AXIS} />
                <YAxis stroke={AXIS} domain={[6, 10]} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="gpa" stroke={ORANGE} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Attendance vs Marks">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={subjects.map((s) => ({ subject: s.subject.split(" ")[0], attendance: Math.round((s.attended / s.total) * 100), marks: s.semester }))}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="subject" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Legend />
                <Bar dataKey="attendance" fill={GOLD} radius={[4, 4, 0, 0]} />
                <Bar dataKey="marks" fill={ORANGE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
      <div className="mt-6">
        <Panel title="🤖 AI Suggestions">
          <ul className="space-y-3">
            {[
              "Your OS attendance is 86% — attend the next 3 classes to hit 90%.",
              "Submit the Graph Traversal assignment 2 days early — impacts leaderboard.",
              "You're strong in AI/ML — consider the NPTEL Deep Learning specialization.",
              "Practice more DBA problems — Networks scored lowest this semester.",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-lg bg-white/5 p-3 text-sm">
                <Sparkles className="mt-0.5 h-4 w-4 text-[var(--dsh-gold)]" /> {s}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function StudentCertificates() {
  return (
    <>
      <PageHeader
        title="Certificates"
        subtitle="Upload and manage your online courses and hackathon certificates."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Upload className="h-4 w-4" /> Upload</button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "NPTEL", "Coursera", "Hackathons"].map((c, i) => (
          <button key={c} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${i === 0 ? "bg-[var(--dsh-primary)]" : "bg-white/10 text-white/70"}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c) => (
          <div key={c.title} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <Award className="h-6 w-6 text-[var(--dsh-gold)]" />
              <Chip tone="info">{c.category}</Chip>
            </div>
            <div className="font-bold">{c.title}</div>
            <div className="mt-1 text-xs text-white/60">{c.issuer} · {c.date}</div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-white/10 py-2 text-xs font-semibold hover:bg-white/20">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function StudentAchievements() {
  const items = [
    { cat: "Awards", title: "Dean's List 2026", date: "May 2026", icon: Award },
    { cat: "Hackathons", title: "SIH 2025 Winner", date: "Nov 2025", icon: Trophy },
    { cat: "Sports", title: "Inter-college Cricket — Runner-up", date: "Feb 2026", icon: Medal },
    { cat: "Competitions", title: "TCS CodeVita Rank 42", date: "Sep 2025", icon: Star },
  ];
  return (
    <>
      <PageHeader title="Achievements" subtitle="Your recognitions & milestones." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a) => (
          <div key={a.title} className="rounded-xl bg-[var(--dsh-card)] p-5 text-center shadow-card">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--dsh-primary)] to-[var(--dsh-gold)]">
              <a.icon className="h-6 w-6 text-white" />
            </div>
            <Chip tone="info">{a.cat}</Chip>
            <div className="mt-2 font-bold text-sm">{a.title}</div>
            <div className="text-[11px] text-white/60">{a.date}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function StudentEvents() {
  return (
    <>
      <PageHeader title="Events" subtitle="Discover, register and revisit campus events." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {events.map((e) => (
          <div key={e.title} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <Chip tone="info">{e.type}</Chip>
                <h3 className="mt-2 font-bold">{e.title}</h3>
                <div className="mt-1 text-xs text-white/60">{e.date} · {e.venue}</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[var(--dsh-primary)]/20 text-[var(--dsh-primary)]">
                <CalendarCheck className="h-5 w-5" />
              </div>
            </div>
            <button className="mt-4 w-full rounded-md bg-[var(--dsh-primary)] py-2 text-xs font-semibold">Register</button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   LEADERSHIP (Student view & Staff management)
   ============================================================ */
const POSITIVE = [
  { code: "P1", label: "Helping Others", pts: 50 },
  { code: "P2", label: "Best Prototype", pts: 40 },
  { code: "P3", label: "Competition Winner", pts: 30 },
  { code: "P4", label: "Project Champion", pts: 30 },
  { code: "P5", label: "Peer Nomination", pts: 20 },
  { code: "P6", label: "Expert Nomination", pts: 20 },
  { code: "P7", label: "Self Learning", pts: 10 },
  { code: "P8", label: "Skill Development", pts: 10 },
  { code: "P9", label: "Social Media Champion", pts: 10 },
];
const NEGATIVE = [
  { code: "M1", label: "Free Rider", pts: -50 },
  { code: "M2", label: "Bunker", pts: -50 },
  { code: "M3", label: "Late Comer", pts: -30 },
  { code: "M4", label: "Poor Assessment", pts: -30 },
  { code: "M5", label: "Session Jumping", pts: -30 },
  { code: "M6", label: "Missed Deadline", pts: -30 },
  { code: "M7", label: "Leave", pts: -10 },
  { code: "M8", label: "Workspace Issues", pts: -10 },
];

const leadershipHistory = [
  { date: "2026-06-28", code: "P1", label: "Helping Others", pts: 50, by: "Dr. Arjun" },
  { date: "2026-06-20", code: "P3", label: "Competition Winner", pts: 30, by: "Dr. Meera" },
  { date: "2026-06-14", code: "M3", label: "Late Comer", pts: -30, by: "Dr. Arjun" },
  { date: "2026-06-05", code: "P7", label: "Self Learning", pts: 10, by: "Auto" },
  { date: "2026-05-28", code: "P5", label: "Peer Nomination", pts: 20, by: "Peers" },
];
const leadershipGrowth = [
  { m: "Jan", score: 120 }, { m: "Feb", score: 180 }, { m: "Mar", score: 230 },
  { m: "Apr", score: 275 }, { m: "May", score: 320 }, { m: "Jun", score: 380 },
];

function StudentLeadership() {
  const total = leadershipHistory.reduce((s, h) => s + h.pts, 0) + 300;
  const level = total > 400 ? "Gold" : total > 250 ? "Silver" : "Bronze";
  return (
    <>
      <PageHeader title="Leadership" subtitle="Your leadership score, activities & growth." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Flame} label="Leadership Score" value={total} accent="primary" trend={`Level: ${level}`} />
        <StatCard icon={ThumbsUp} label="Positive Actions" value={leadershipHistory.filter((h) => h.pts > 0).length} accent="gold" />
        <StatCard icon={ThumbsDown} label="Deductions" value={leadershipHistory.filter((h) => h.pts < 0).length} accent="secondary" />
        <StatCard icon={Trophy} label="Badges" value="4" accent="white" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Leadership Growth">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={leadershipGrowth}>
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ORANGE} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={ORANGE} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="m" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="score" stroke={ORANGE} fill="url(#lg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Badges">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Helper", "Innovator", "Consistent", "Winner"].map((b) => (
              <div key={b} className="rounded-xl bg-white/5 p-4 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[var(--dsh-primary)] to-[var(--dsh-gold)]">
                  <Medal className="h-5 w-5 text-white" />
                </div>
                <div className="mt-2 text-xs font-bold">{b}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Positive Activities" subtitle="Earn points">
          <ul className="space-y-2">
            {POSITIVE.map((p) => (
              <li key={p.code} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                <span><span className="font-mono text-xs text-white/50 mr-2">{p.code}</span>{p.label}</span>
                <Chip tone="success">+{p.pts}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Negative Activities" subtitle="Avoid deductions">
          <ul className="space-y-2">
            {NEGATIVE.map((p) => (
              <li key={p.code} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                <span><span className="font-mono text-xs text-white/50 mr-2">{p.code}</span>{p.label}</span>
                <Chip tone="danger">{p.pts}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Point History">
          <TableShell>
            <thead><tr><Th>Date</Th><Th>Code</Th><Th>Activity</Th><Th>Points</Th><Th>Awarded By</Th></tr></thead>
            <tbody>
              {leadershipHistory.map((h, i) => (
                <tr key={i}>
                  <Td>{h.date}</Td>
                  <Td className="font-mono">{h.code}</Td>
                  <Td>{h.label}</Td>
                  <Td><Chip tone={h.pts > 0 ? "success" : "danger"}>{h.pts > 0 ? `+${h.pts}` : h.pts}</Chip></Td>
                  <Td>{h.by}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      </div>
    </>
  );
}

function StaffLeadership() {
  return (
    <>
      <PageHeader
        title="Leadership Management"
        subtitle="Award positive or deduct negative points for any student."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Award Points">
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">Student</label>
            <select className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none">
              {studentsList.map((s) => <option key={s.id}>{s.id} · {s.name}</option>)}
            </select>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">Category</label>
            <select className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none">
              <optgroup label="Positive">
                {POSITIVE.map((p) => <option key={p.code}>{p.code} · {p.label} (+{p.pts})</option>)}
              </optgroup>
              <optgroup label="Negative">
                {NEGATIVE.map((p) => <option key={p.code}>{p.code} · {p.label} ({p.pts})</option>)}
              </optgroup>
            </select>
            <textarea placeholder="Remarks (optional)" rows={3} className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none" />
            <div className="flex gap-2">
              <button className="flex-1 rounded-md bg-emerald-500/80 py-2 text-xs font-semibold text-white"><ThumbsUp className="inline h-3.5 w-3.5 mr-1" /> Award</button>
              <button className="flex-1 rounded-md bg-red-500/80 py-2 text-xs font-semibold text-white"><ThumbsDown className="inline h-3.5 w-3.5 mr-1" /> Deduct</button>
            </div>
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={Flame} label="Avg Score" value="312" accent="primary" />
            <StatCard icon={ThumbsUp} label="Points Awarded" value="1,240" accent="gold" />
            <StatCard icon={ShieldAlert} label="Deductions" value="180" accent="secondary" />
          </div>
          <Panel title="Recent Actions">
            <TableShell>
              <thead><tr><Th>Student</Th><Th>Code</Th><Th>Activity</Th><Th>Points</Th><Th>By</Th></tr></thead>
              <tbody>
                {leadershipHistory.map((h, i) => (
                  <tr key={i}>
                    <Td>{studentsList[i % studentsList.length].name}</Td>
                    <Td className="font-mono">{h.code}</Td>
                    <Td>{h.label}</Td>
                    <Td><Chip tone={h.pts > 0 ? "success" : "danger"}>{h.pts > 0 ? `+${h.pts}` : h.pts}</Chip></Td>
                    <Td>{h.by}</Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </Panel>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   STAFF PAGES
   ============================================================ */
function StaffHome() {
  return (
    <>
      <PageHeader title="Good morning, Prof. Deshmukh 👋" subtitle="Your teaching overview at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Students" value="248" />
        <StatCard icon={CalendarCheck} label="Total Classes" value="32" accent="gold" />
        <StatCard icon={ClipboardList} label="Pending Reviews" value="14" accent="secondary" />
        <StatCard icon={CalendarCheck} label="Avg Attendance" value="89%" accent="white" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Department Performance">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={departmentPerf}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="dept" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="avg" fill={ORANGE} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Attendance Statistics">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ORANGE} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={ORANGE} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="month" stroke={AXIS} />
                <YAxis stroke={AXIS} domain={[70, 100]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="pct" stroke={ORANGE} fill="url(#ag2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </>
  );
}

function StaffStudents() {
  return (
    <>
      <PageHeader
        title="Student Management"
        subtitle="View, add, edit or remove student records."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Add Student</button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="Search by name or register number…" className="flex-1 min-w-[240px] rounded-md bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40" />
        <select className="rounded-md bg-white/5 px-3 py-2 text-sm outline-none">
          <option>All Departments</option><option>CSE</option><option>ECE</option><option>IT</option>
        </select>
      </div>
      <Panel title={`${studentsList.length} students`}>
        <TableShell>
          <thead><tr><Th>ID</Th><Th>Name</Th><Th>Dept</Th><Th>Year</Th><Th>CGPA</Th><Th>Attendance</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {studentsList.map((s) => (
              <tr key={s.id}>
                <Td className="font-mono">{s.id}</Td><Td>{s.name}</Td><Td>{s.dept}</Td><Td>{s.year}</Td>
                <Td>{s.cgpa}</Td><Td>{s.attendance}%</Td>
                <Td><div className="flex gap-2">
                  <button className="text-xs text-[var(--dsh-primary)]">Edit</button>
                  <button className="text-xs text-red-300">Remove</button>
                </div></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function StaffAttendance() {
  return (
    <>
      <PageHeader
        title="Attendance Management"
        subtitle="Mark and manage class attendance."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Upload className="h-4 w-4" /> Bulk Upload</button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <select className="rounded-md bg-white/5 px-3 py-2 text-sm"><option>CSE</option><option>ECE</option></select>
        <select className="rounded-md bg-white/5 px-3 py-2 text-sm"><option>Data Structures</option><option>DBMS</option></select>
        <select className="rounded-md bg-white/5 px-3 py-2 text-sm"><option>Year 3</option><option>Year 2</option></select>
        <input type="date" className="rounded-md bg-white/5 px-3 py-2 text-sm" />
      </div>
      <Panel title="Today's Class · Data Structures">
        <TableShell>
          <thead><tr><Th>ID</Th><Th>Name</Th><Th>Present</Th></tr></thead>
          <tbody>
            {studentsList.map((s, i) => (
              <tr key={s.id}>
                <Td className="font-mono">{s.id}</Td><Td>{s.name}</Td>
                <Td><input type="checkbox" defaultChecked={i !== 3} className="h-4 w-4 accent-[var(--dsh-primary)]" /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-md bg-white/10 px-4 py-2 text-xs">Cancel</button>
          <button className="rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-xs font-semibold">Save Attendance</button>
        </div>
      </Panel>
    </>
  );
}

function StaffMarks() {
  return (
    <>
      <PageHeader
        title="Marks Management"
        subtitle="Upload internal, practical and semester marks."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Upload className="h-4 w-4" /> Import Excel</button>}
      />
      <div className="mb-4 flex gap-2">
        {["Internal", "Practical", "Semester"].map((t, i) => (
          <button key={t} className={`rounded-md px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-[var(--dsh-primary)]" : "bg-white/10 text-white/70"}`}>{t}</button>
        ))}
      </div>
      <Panel title="Enter Marks · Data Structures · Internal">
        <TableShell>
          <thead><tr><Th>ID</Th><Th>Name</Th><Th>Marks / 50</Th></tr></thead>
          <tbody>
            {studentsList.map((s) => (
              <tr key={s.id}>
                <Td className="font-mono">{s.id}</Td><Td>{s.name}</Td>
                <Td><input type="number" defaultValue={42 + (s.id.charCodeAt(3) % 8)} className="w-24 rounded-md bg-white/5 px-2 py-1 text-sm outline-none" /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
        <div className="mt-4 flex justify-end">
          <button className="rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-xs font-semibold">Save Marks</button>
        </div>
      </Panel>
    </>
  );
}

function StaffAssignments() {
  return (
    <>
      <PageHeader
        title="Assignment Management"
        subtitle="Create assignments and grade submissions."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Create Assignment</button>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Create New">
          <div className="space-y-3">
            <input placeholder="Assignment title" className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none" />
            <textarea placeholder="Description" rows={4} className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none" />
            <input type="date" className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none" />
            <button className="w-full rounded-md bg-[var(--dsh-primary)] py-2 text-sm font-semibold">Publish</button>
          </div>
        </Panel>
        <Panel title="Recent Submissions">
          <ul className="space-y-3">
            {studentsList.slice(0, 4).map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-sm">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-[11px] text-white/60">Graph Traversal Report · submitted 2h ago</div>
                </div>
                <button className="rounded bg-[var(--dsh-primary)]/20 px-3 py-1 text-xs text-[var(--dsh-primary)]">Grade</button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function StaffAnalytics() {
  return (
    <>
      <PageHeader title="Student Analytics" subtitle="Identify top performers and students at risk." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={TrendingUp} label="Top Performers" value="42" accent="gold" />
        <StatCard icon={Users} label="Average" value="164" />
        <StatCard icon={XCircle} label="At Risk" value="18" accent="secondary" />
      </div>
      <div className="mt-6">
        <Panel title="Performance Distribution">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={[
                { band: "90-100", count: 42 }, { band: "80-89", count: 78 },
                { band: "70-79", count: 86 }, { band: "60-69", count: 28 }, { band: "<60", count: 14 },
              ]}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="band" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" fill={ORANGE} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </>
  );
}

function StaffReports() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Generate and export attendance, marks and performance reports." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Attendance Report", desc: "Monthly attendance across sections", icon: CalendarCheck },
          { title: "Marks Report", desc: "Semester and internal marks summary", icon: GraduationCap },
          { title: "Performance Report", desc: "Trends, top & bottom performers", icon: TrendingUp },
        ].map((r) => (
          <div key={r.title} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--dsh-primary)]/20 text-[var(--dsh-primary)]"><r.icon className="h-5 w-5" /></div>
            <div className="mt-3 font-bold">{r.title}</div>
            <div className="mt-1 text-xs text-white/60">{r.desc}</div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-md bg-[var(--dsh-primary)] py-2 text-xs font-semibold">Export PDF</button>
              <button className="flex-1 rounded-md bg-white/10 py-2 text-xs">Excel</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StaffLeaderboard() {
  return (
    <>
      <PageHeader
        title="Leaderboard Management"
        subtitle="Recalculate scores, add bonus points and verify rankings."
        action={<div className="flex gap-2">
          <button className="rounded-md bg-white/10 px-4 py-2 text-xs">Recalculate</button>
          <button className="rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-xs font-semibold">Publish</button>
        </div>}
      />
      <Panel title="Current Rankings">
        <TableShell>
          <thead><tr><Th>Rank</Th><Th>Name</Th><Th>Dept</Th><Th>Score</Th><Th>Bonus</Th></tr></thead>
          <tbody>
            {leaderboard.map((l) => (
              <tr key={l.rank}>
                <Td className="font-bold">#{l.rank}</Td><Td>{l.name}</Td><Td>{l.dept}</Td>
                <Td className="font-mono">{l.score}</Td>
                <Td><input type="number" defaultValue={0} className="w-16 rounded bg-white/5 px-2 py-1 text-sm outline-none" /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function StaffEvents() {
  return (
    <>
      <PageHeader
        title="Events Management"
        subtitle="Create events and manage participants."
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Create Event</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((e) => (
          <div key={e.title} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <Chip tone="info">{e.type}</Chip>
            <div className="mt-2 font-bold">{e.title}</div>
            <div className="text-xs text-white/60">{e.date} · {e.venue}</div>
            <div className="mt-3 flex gap-2">
              <button className="rounded bg-white/10 px-3 py-1 text-xs">Edit</button>
              <button className="rounded bg-[var(--dsh-primary)]/20 px-3 py-1 text-xs text-[var(--dsh-primary)]">Participants</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StaffProfile() {
  return (
    <>
      <PageHeader title="Staff Profile" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Info">
          <div className="text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[var(--dsh-primary)] to-[var(--dsh-gold)] text-3xl font-black">A</div>
            <div className="mt-4 text-lg font-bold">Dr. Anita Deshmukh</div>
            <div className="text-xs text-white/60">Head of Department · CSE</div>
          </div>
        </Panel>
        <div className="lg:col-span-2">
          <Panel title="Details">
            <div className="grid gap-4 sm:grid-cols-2">
              {[["Staff ID", "STF-1042"], ["Department", "Computer Science"], ["Experience", "12 years"], ["Email", "anita@college.edu"]].map(([k, v]) => (
                <div key={k}><div className="text-[11px] uppercase tracking-wider text-white/50">{k}</div><div className="mt-1 text-sm font-medium">{v}</div></div>
              ))}
              <div className="sm:col-span-2">
                <div className="text-[11px] uppercase tracking-wider text-white/50">Subjects Handled</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Data Structures", "Operating Systems", "System Design"].map((s) => <Chip key={s} tone="info">{s}</Chip>)}
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   ALUMNI PAGES
   ============================================================ */
function AlumniHome() {
  return (
    <>
      <PageHeader title="Welcome back, Vikram 👋" subtitle="Stay connected with your alma mater." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Handshake} label="Mentorship Sessions" value="18" />
        <StatCard icon={CalendarCheck} label="Upcoming Events" value="3" accent="gold" />
        <StatCard icon={Users} label="Students Connected" value="42" accent="secondary" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent Mentorship Requests">
          <ul className="space-y-3">
            {mentorshipRequests.map((m) => (
              <li key={m.student} className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-sm">
                <div>
                  <div className="font-semibold">{m.student}</div>
                  <div className="text-[11px] text-white/60">{m.topic} · {m.when}</div>
                </div>
                <div className="flex gap-1">
                  <button className="rounded bg-emerald-500/20 p-1.5 text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /></button>
                  <button className="rounded bg-red-500/20 p-1.5 text-red-300"><XCircle className="h-3.5 w-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Upcoming Alumni Events">
          <ul className="space-y-3">
            {events.slice(0, 3).map((e) => (
              <li key={e.title} className="rounded-lg bg-white/5 p-3">
                <div className="text-sm font-semibold">{e.title}</div>
                <div className="text-[11px] text-white/60">{e.date} · {e.venue}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function AlumniProfile() {
  return (
    <>
      <PageHeader title="Alumni Profile" />
      <Panel title="Career Details" action={<button className="rounded-md bg-[var(--dsh-primary)] px-3 py-1.5 text-xs font-semibold">Edit</button>}>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Name", "Vikram Rao"], ["Graduation Year", "2012"], ["Company", "EduSpark (Founder)"],
            ["Position", "CEO"], ["Experience", "13 years"], ["Location", "Bangalore, India"],
          ].map(([k, v]) => (
            <div key={k}><div className="text-[11px] uppercase tracking-wider text-white/50">{k}</div><div className="mt-1 text-sm font-medium">{v}</div></div>
          ))}
          <div className="sm:col-span-2">
            <div className="text-[11px] uppercase tracking-wider text-white/50">Skills</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Leadership", "Product", "EdTech", "Fundraising"].map((s) => <Chip key={s} tone="info">{s}</Chip>)}
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}

function AlumniMentorship() {
  return (
    <>
      <PageHeader
        title="Mentorship"
        subtitle="Guide the next generation of FORGE students."
        action={<button className="rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold">Become a Mentor</button>}
      />
      <Panel title="Session Requests">
        <TableShell>
          <thead><tr><Th>Student</Th><Th>Topic</Th><Th>When</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {mentorshipRequests.map((m) => (
              <tr key={m.student}>
                <Td>{m.student}</Td><Td>{m.topic}</Td><Td>{m.when}</Td>
                <Td><div className="flex gap-2">
                  <button className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">Accept</button>
                  <button className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-300">Decline</button>
                </div></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function AlumniEvents() {
  return (
    <>
      <PageHeader title="Alumni Events" subtitle="Meets, workshops and webinars." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {events.map((e) => (
          <div key={e.title} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <Chip tone="info">{e.type}</Chip>
            <div className="mt-2 font-bold">{e.title}</div>
            <div className="text-xs text-white/60">{e.date} · {e.venue}</div>
            <button className="mt-4 w-full rounded-md bg-[var(--dsh-primary)] py-2 text-xs font-semibold">RSVP</button>
          </div>
        ))}
      </div>
    </>
  );
}

function AlumniJobs() {
  return (
    <>
      <PageHeader
        title="Job Opportunities"
        subtitle="Share openings and referrals with FORGE talent."
        action={<button className="rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold">Post a Job</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.map((j) => (
          <div key={j.title} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold">{j.title}</div>
                <div className="text-xs text-white/60">{j.company} · {j.loc}</div>
              </div>
              <Chip tone={j.type === "Internship" ? "warn" : "info"}>{j.type}</Chip>
            </div>
            <button className="mt-4 w-full rounded-md bg-white/10 py-2 text-xs font-semibold">Refer Student</button>
          </div>
        ))}
      </div>
    </>
  );
}

function AlumniDiscussions() {
  return (
    <>
      <PageHeader title="Discussions" subtitle="Answer student questions and share your journey." />
      <Panel title="Recent Threads">
        <ul className="divide-y divide-white/5">
          {discussions.map((d) => (
            <li key={d.topic} className="flex items-center justify-between py-3">
              <div>
                <div className="font-semibold text-sm">{d.topic}</div>
                <div className="text-[11px] text-white/60">by {d.by}</div>
              </div>
              <Chip tone="info"><MessageSquare className="mr-1 inline h-3 w-3" /> {d.replies}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}

function AlumniStories() {
  return (
    <>
      <PageHeader
        title="Success Stories"
        subtitle="Inspire students with your journey."
        action={<button className="rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold">Share Your Story</button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {successStories.map((s) => (
          <div key={s.name} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <Sparkles className="h-5 w-5 text-[var(--dsh-gold)]" />
            <div className="mt-2 font-bold">{s.name}</div>
            <Chip tone="warn">Batch {s.batch}</Chip>
            <p className="mt-3 text-sm text-white/70">{s.story}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   ADMIN PAGES
   ============================================================ */
function AdminHome() {
  return (
    <>
      <PageHeader title="Admin Overview" subtitle="System-wide health & activity." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Students" value="5,024" />
        <StatCard icon={UserRound} label="Total Staff" value="312" accent="gold" />
        <StatCard icon={Users} label="Total Alumni" value="1,586" accent="secondary" />
        <StatCard icon={ClipboardList} label="Pending Requests" value={accessRequests.length} accent="white" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="User Growth">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ORANGE} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={ORANGE} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="m" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="users" stroke={ORANGE} fill="url(#ug)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Department Statistics">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={departmentPerf}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="dept" stroke={AXIS} />
                <YAxis stroke={AXIS} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="avg" fill={GOLD} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </>
  );
}

function AdminRequests() {
  return (
    <>
      <PageHeader title="Access Requests" subtitle="Approve or reject new student and staff sign-ups." />
      <Panel title={`${accessRequests.length} pending requests`}>
        <TableShell>
          <thead><tr><Th>ID</Th><Th>Name</Th><Th>Role</Th><Th>Email</Th><Th>Requested</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {accessRequests.map((r) => (
              <tr key={r.id}>
                <Td className="font-mono">{r.id}</Td><Td>{r.name}</Td>
                <Td><Chip tone={r.role === "Student" ? "info" : "warn"}>{r.role}</Chip></Td>
                <Td>{r.email}</Td><Td>{r.date}</Td>
                <Td>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300"><CheckCircle2 className="h-3 w-3" /> Approve</button>
                    <button className="inline-flex items-center gap-1 rounded bg-red-500/20 px-2 py-1 text-xs text-red-300"><XCircle className="h-3 w-3" /> Reject</button>
                    <button className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs"><Mail className="h-3 w-3" /> Email</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function AdminUsers() {
  return (
    <>
      <PageHeader title="User Management" subtitle="Manage all students, staff and alumni." />
      <div className="mb-4 flex gap-2">
        {["All", "Students", "Staff", "Alumni"].map((c, i) => (
          <button key={c} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${i === 0 ? "bg-[var(--dsh-primary)]" : "bg-white/10 text-white/70"}`}>{c}</button>
        ))}
      </div>
      <Panel title="All Users">
        <TableShell>
          <thead><tr><Th>ID</Th><Th>Name</Th><Th>Dept</Th><Th>Role</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {studentsList.map((s) => (
              <tr key={s.id}>
                <Td className="font-mono">{s.id}</Td><Td>{s.name}</Td><Td>{s.dept}</Td>
                <Td><Chip tone="info">Student</Chip></Td>
                <Td><Chip tone="success">Active</Chip></Td>
                <Td>
                  <div className="flex gap-2">
                    <button className="text-xs text-[var(--dsh-primary)]">Edit</button>
                    <button className="text-xs text-[var(--dsh-gold)]">Suspend</button>
                    <button className="text-xs text-red-300">Delete</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function AdminDepartments() {
  return (
    <>
      <PageHeader
        title="Department Management"
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Add Department</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {departments.map((d) => (
          <div key={d.code} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--dsh-primary)]/20 text-[var(--dsh-primary)]"><Building2 className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">{d.name}</div>
                  <div className="text-xs text-white/60">{d.code} · HOD: {d.hod}</div>
                </div>
              </div>
              <button className="text-xs text-[var(--dsh-primary)]">Edit</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/5 p-3"><div className="text-[10px] uppercase text-white/50">Students</div><div className="text-lg font-bold">{d.students}</div></div>
              <div className="rounded-lg bg-white/5 p-3"><div className="text-[10px] uppercase text-white/50">Staff</div><div className="text-lg font-bold">{d.staff}</div></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AdminReports() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Institution-wide and department reports." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Institution Report", "Department Report", "Attendance Report", "Placement Report", "Alumni Report", "Financial Report"].map((r) => (
          <div key={r} className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
            <FileText className="h-6 w-6 text-[var(--dsh-primary)]" />
            <div className="mt-3 font-bold">{r}</div>
            <div className="text-xs text-white/60">Generated: 2 days ago</div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-md bg-[var(--dsh-primary)] py-2 text-xs font-semibold">PDF</button>
              <button className="flex-1 rounded-md bg-white/10 py-2 text-xs">Excel</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AdminLeaderboard() {
  return (
    <>
      <PageHeader title="Leaderboard Management" subtitle="View, adjust and publish institution-wide rankings." />
      <Panel title="Top 6 Overall">
        <TableShell>
          <thead><tr><Th>Rank</Th><Th>Name</Th><Th>Dept</Th><Th>Score</Th><Th>Adjust</Th></tr></thead>
          <tbody>
            {leaderboard.map((l) => (
              <tr key={l.rank}>
                <Td className="font-bold">#{l.rank}</Td><Td>{l.name}</Td><Td>{l.dept}</Td>
                <Td className="font-mono">{l.score}</Td>
                <Td><input type="number" placeholder="+/-" className="w-20 rounded bg-white/5 px-2 py-1 text-sm outline-none" /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function AdminEvents() {
  return (
    <>
      <PageHeader
        title="Event Management"
        action={<button className="inline-flex items-center gap-2 rounded-md bg-[var(--dsh-primary)] px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> New Event</button>}
      />
      <Panel title="All Events">
        <TableShell>
          <thead><tr><Th>Event</Th><Th>Type</Th><Th>Date</Th><Th>Venue</Th><Th>Registrations</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={e.title}>
                <Td className="font-semibold">{e.title}</Td>
                <Td><Chip tone="info">{e.type}</Chip></Td>
                <Td>{e.date}</Td><Td>{e.venue}</Td><Td>{120 + i * 45}</Td>
                <Td><button className="text-xs text-[var(--dsh-primary)]">Manage</button></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </>
  );
}

function AdminNotifications() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="Send emails and announcements to your community." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Compose Announcement">
          <div className="space-y-3">
            <select className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none">
              <option>All Users</option><option>Students Only</option><option>Staff Only</option><option>Alumni Only</option>
            </select>
            <input placeholder="Subject" className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none" />
            <textarea placeholder="Message…" rows={6} className="w-full rounded-md bg-white/5 px-3 py-2 text-sm outline-none" />
            <div className="flex gap-2">
              <button className="flex-1 rounded-md bg-[var(--dsh-primary)] py-2 text-sm font-semibold">Send Email</button>
              <button className="flex-1 rounded-md bg-white/10 py-2 text-sm">Post Announcement</button>
            </div>
          </div>
        </Panel>
        <Panel title="Recent Announcements">
          <ul className="space-y-3">
            {[
              { t: "Mid-sem exam schedule released", d: "2 hours ago" },
              { t: "Alumni Meet 2026 registrations open", d: "1 day ago" },
              { t: "Library timings updated", d: "3 days ago" },
            ].map((n) => (
              <li key={n.t} className="flex items-start gap-3 rounded-lg bg-white/5 p-3 text-sm">
                <Bell className="mt-0.5 h-4 w-4 text-[var(--dsh-primary)]" />
                <div><div className="font-semibold">{n.t}</div><div className="text-[11px] text-white/60">{n.d}</div></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

/* Generic Settings for any role */
function GenericSettings({ role }: { role: RoleKey }) {
  return (
    <>
      <PageHeader title="Settings" subtitle={`Manage your ${role} account preferences.`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Account">
          <div className="space-y-4">
            {["Email Notifications", "SMS Alerts", "Weekly Digest", "Auto-approval (Admin only)"].map((k, i) => (
              <label key={k} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <span className="text-sm">{k}</span>
                <input type="checkbox" defaultChecked={i < 2} className="h-4 w-4 accent-[var(--dsh-primary)]" />
              </label>
            ))}
          </div>
        </Panel>
        <Panel title="Security">
          <div className="space-y-3">
            <button className="w-full rounded-md bg-white/10 py-2 text-sm">Change Password</button>
            <button className="w-full rounded-md bg-white/10 py-2 text-sm">Enable 2FA</button>
            <button className="w-full rounded-md bg-red-500/20 py-2 text-sm text-red-300">Delete Account</button>
          </div>
        </Panel>
      </div>
    </>
  );
}

/* ============================================================
   REGISTRY
   ============================================================ */
type PageFn = () => React.ReactElement;

const PAGES: Record<RoleKey, Record<string, PageFn>> = {
  student: {
    "": StudentHome,
    profile: StudentProfile,
    attendance: StudentAttendance,
    marks: StudentMarks,
    assignments: StudentAssignments,
    leadership: StudentLeadership,
    leaderboard: StudentLeaderboard,
    analytics: StudentAnalytics,
    certificates: StudentCertificates,
    achievements: StudentAchievements,
    events: StudentEvents,
    settings: () => <GenericSettings role="student" />,
  },
  staff: {
    "": StaffHome,
    students: StaffStudents,
    attendance: StaffAttendance,
    marks: StaffMarks,
    assignments: StaffAssignments,
    leadership: StaffLeadership,
    analytics: StaffAnalytics,
    reports: StaffReports,
    leaderboard: StaffLeaderboard,
    events: StaffEvents,
    profile: StaffProfile,
  },
  alumni: {
    "": AlumniHome,
    profile: AlumniProfile,
    mentorship: AlumniMentorship,
    events: AlumniEvents,
    jobs: AlumniJobs,
    discussions: AlumniDiscussions,
    stories: AlumniStories,
    settings: () => <GenericSettings role="alumni" />,
  },
  admin: {
    "": AdminHome,
    requests: AdminRequests,
    users: AdminUsers,
    departments: AdminDepartments,
    reports: AdminReports,
    leaderboard: AdminLeaderboard,
    events: AdminEvents,
    notifications: AdminNotifications,
    settings: () => <GenericSettings role="admin" />,
  },
};

export function renderDashboardPage(role: RoleKey, page: string) {
  const Fn = PAGES[role]?.[page];
  if (!Fn) return null;
  return <Fn />;
}
