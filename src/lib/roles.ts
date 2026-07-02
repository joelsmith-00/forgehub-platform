import { GraduationCap, Briefcase, Users, ShieldCheck, type LucideIcon } from "lucide-react";

export type RoleKey = "student" | "staff" | "alumni" | "admin";

export interface RoleConfig {
  key: RoleKey;
  label: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  idField: { label: string; placeholder: string };
  signupFields: Array<{ key: string; label: string; placeholder: string; type?: string }>;
  signupNote: string;
  accent: string; // tailwind gradient classes
}

export const ROLES: Record<RoleKey, RoleConfig> = {
  student: {
    key: "student",
    label: "Student",
    tagline: "Learn. Grow. Excel.",
    description: "Track attendance, marks, assignments and climb the leaderboard.",
    icon: GraduationCap,
    idField: { label: "Student ID", placeholder: "Enter your student ID" },
    signupFields: [
      { key: "name", label: "Full Name", placeholder: "Enter your full name" },
      { key: "register", label: "Register Number", placeholder: "Enter your register number" },
      { key: "email", label: "Mail ID", placeholder: "you@college.edu", type: "email" },
    ],
    signupNote: "Your request will be reviewed by the admin. You'll receive an email once approved.",
    accent: "from-orange-500 to-amber-500",
  },
  staff: {
    key: "staff",
    label: "Staff",
    tagline: "Teach. Mentor. Manage.",
    description: "Upload marks, manage attendance, publish assignments and generate reports.",
    icon: Briefcase,
    idField: { label: "Staff ID", placeholder: "Enter your staff ID" },
    signupFields: [
      { key: "name", label: "Full Name", placeholder: "Enter your full name" },
      { key: "email", label: "Mail ID", placeholder: "you@college.edu", type: "email" },
    ],
    signupNote: "Staff accounts require verification by the system administrator.",
    accent: "from-rose-500 to-orange-500",
  },
  alumni: {
    key: "alumni",
    label: "Alumni",
    tagline: "Connect. Mentor. Inspire.",
    description: "Reconnect with peers, mentor students and join alumni events.",
    icon: Users,
    idField: { label: "Alumni ID", placeholder: "Enter your alumni ID" },
    signupFields: [
      { key: "name", label: "Full Name", placeholder: "Enter your full name" },
      { key: "email", label: "Mail ID", placeholder: "you@company.com", type: "email" },
      { key: "gradYear", label: "Graduation Year", placeholder: "e.g. 2020" },
    ],
    signupNote: "Verify your graduation details to activate your alumni account.",
    accent: "from-amber-500 to-yellow-500",
  },
  admin: {
    key: "admin",
    label: "Admin",
    tagline: "Approve. Oversee. Report.",
    description: "Manage users, approve requests and oversee the platform.",
    icon: ShieldCheck,
    idField: { label: "Admin ID / Email", placeholder: "Enter your admin ID or email" },
    signupFields: [],
    signupNote: "Admin accounts are provisioned internally. Contact the system owner.",
    accent: "from-orange-600 to-red-500",
  },
};

export const ROLE_LIST: RoleConfig[] = [ROLES.student, ROLES.staff, ROLES.alumni, ROLES.admin];
