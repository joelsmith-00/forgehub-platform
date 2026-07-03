import {
  LayoutDashboard, UserRound, CalendarCheck, GraduationCap, ClipboardList, Trophy,
  LineChart, Award, Medal, CalendarDays, Settings, LogOut, Users, BarChart3, FileText,
  Briefcase, MessageSquare, Sparkles, Building2, Bell, ShieldCheck, UserCheck, Handshake,
  type LucideIcon,
} from "lucide-react";
import type { RoleKey } from "./roles";

export type NavItem = { key: string; label: string; icon: LucideIcon };

export const DASHBOARD_NAV: Record<RoleKey, NavItem[]> = {
  student: [
    { key: "", label: "Dashboard", icon: LayoutDashboard },
    { key: "profile", label: "Profile", icon: UserRound },
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "marks", label: "Marks", icon: GraduationCap },
    { key: "assignments", label: "Assignments", icon: ClipboardList },
    { key: "leaderboard", label: "Leaderboard", icon: Trophy },
    { key: "analytics", label: "Analytics", icon: LineChart },
    { key: "certificates", label: "Certificates", icon: Award },
    { key: "achievements", label: "Achievements", icon: Medal },
    { key: "events", label: "Events", icon: CalendarDays },
    { key: "settings", label: "Settings", icon: Settings },
  ],
  staff: [
    { key: "", label: "Dashboard", icon: LayoutDashboard },
    { key: "students", label: "Students", icon: Users },
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "marks", label: "Marks", icon: GraduationCap },
    { key: "assignments", label: "Assignments", icon: ClipboardList },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
    { key: "reports", label: "Reports", icon: FileText },
    { key: "leaderboard", label: "Leaderboard", icon: Trophy },
    { key: "events", label: "Events", icon: CalendarDays },
    { key: "profile", label: "Profile", icon: UserRound },
  ],
  alumni: [
    { key: "", label: "Dashboard", icon: LayoutDashboard },
    { key: "profile", label: "Profile", icon: UserRound },
    { key: "mentorship", label: "Mentorship", icon: Handshake },
    { key: "events", label: "Events", icon: CalendarDays },
    { key: "jobs", label: "Jobs", icon: Briefcase },
    { key: "discussions", label: "Discussions", icon: MessageSquare },
    { key: "stories", label: "Success Stories", icon: Sparkles },
    { key: "settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { key: "", label: "Dashboard", icon: LayoutDashboard },
    { key: "requests", label: "Access Requests", icon: UserCheck },
    { key: "users", label: "Users", icon: Users },
    { key: "departments", label: "Departments", icon: Building2 },
    { key: "reports", label: "Reports", icon: FileText },
    { key: "leaderboard", label: "Leaderboard", icon: Trophy },
    { key: "events", label: "Events", icon: CalendarDays },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "settings", label: "Settings", icon: ShieldCheck },
  ],
};

export const LOGOUT_ITEM: NavItem = { key: "__logout", label: "Logout", icon: LogOut };
