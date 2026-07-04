import { GraduationCap, Briefcase, Users, ShieldCheck, type LucideIcon } from "lucide-react";

export type RoleKey = "student" | "staff" | "alumni" | "admin";

export interface SignupField {
  key: "name" | "register" | "staffId" | "department" | "email" | "phone" | "gradYear" | "company" | "password";
  label: string;
  placeholder: string;
  type?: string;
}

export interface RoleConfig {
  key: RoleKey;
  label: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  idField: { label: string; placeholder: string };
  signupFields: SignupField[];
  signupNote: string;
  accent: string;
}

const PWD: SignupField = { key: "password", label: "Password", placeholder: "Create a password", type: "password" };

export const ROLES: Record<RoleKey, RoleConfig> = {
  student: {
    key: "student",
    label: "Student",
    tagline: "Learn. Grow. Excel.",
    description: "Track attendance, marks, assignments and climb the leaderboard.",
    icon: GraduationCap,
    idField: { label: "Register No / FORGE ID / Email", placeholder: "e.g. 23AIDS001" },
    signupFields: [
      { key: "name", label: "Full Name", placeholder: "Enter your full name" },
      { key: "register", label: "Register Number", placeholder: "e.g. 23AIDS001" },
      { key: "department", label: "Department", placeholder: "e.g. AI & DS" },
      { key: "email", label: "Email", placeholder: "you@college.edu", type: "email" },
      { key: "phone", label: "Phone", placeholder: "+91 9xxxxxxxxx" },
      PWD,
    ],
    signupNote: "Your account is created instantly with a unique FORGE ID.",
    accent: "from-orange-500 to-amber-500",
  },
  staff: {
    key: "staff",
    label: "Staff",
    tagline: "Teach. Mentor. Manage.",
    description: "Upload marks, manage attendance, publish assignments and generate reports.",
    icon: Briefcase,
    idField: { label: "Staff ID / FORGE ID / Email", placeholder: "e.g. STF001" },
    signupFields: [
      { key: "name", label: "Full Name", placeholder: "Enter your full name" },
      { key: "staffId", label: "Staff ID", placeholder: "e.g. STF001" },
      { key: "department", label: "Department", placeholder: "e.g. AI & DS" },
      { key: "email", label: "Email", placeholder: "you@college.edu", type: "email" },
      { key: "phone", label: "Phone", placeholder: "+91 9xxxxxxxxx" },
      PWD,
    ],
    signupNote: "Staff accounts are created instantly with a unique FORGE Staff ID.",
    accent: "from-rose-500 to-orange-500",
  },
  alumni: {
    key: "alumni",
    label: "Alumni",
    tagline: "Connect. Mentor. Inspire.",
    description: "Reconnect with peers, mentor students and join alumni events.",
    icon: Users,
    idField: { label: "FORGE ID / Email", placeholder: "e.g. FORGE-ALM-2026-0001" },
    signupFields: [
      { key: "name", label: "Full Name", placeholder: "Enter your full name" },
      { key: "gradYear", label: "Graduation Year", placeholder: "e.g. 2018" },
      { key: "department", label: "Department", placeholder: "e.g. AI & DS" },
      { key: "company", label: "Current Company", placeholder: "e.g. Google" },
      { key: "email", label: "Email", placeholder: "you@company.com", type: "email" },
      { key: "phone", label: "Phone", placeholder: "+91 9xxxxxxxxx" },
      PWD,
    ],
    signupNote: "Alumni accounts are created instantly with a unique FORGE Alumni ID.",
    accent: "from-amber-500 to-yellow-500",
  },
  admin: {
    key: "admin",
    label: "Admin",
    tagline: "Approve. Oversee. Report.",
    description: "Manage users, approve requests and oversee the platform.",
    icon: ShieldCheck,
    idField: { label: "Admin ID", placeholder: "forgeadmin" },
    signupFields: [],
    signupNote: "Admin accounts are provisioned internally. Contact the system owner.",
    accent: "from-orange-600 to-red-500",
  },
};

export const ROLE_LIST: RoleConfig[] = [ROLES.student, ROLES.staff, ROLES.alumni, ROLES.admin];
