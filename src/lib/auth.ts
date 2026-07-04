// Client-side auth store backed by localStorage. Frontend-only demo — replace
// with Lovable Cloud when persistence is required.
import type { RoleKey } from "./roles";

export const ADMIN_ID = "forgeadmin";
export const ADMIN_PASSWORD = "forge@admin2026"; // developer-editable

const USERS_KEY = "forge.users.v1";
const CURRENT_KEY = "forge.current.v1";
const SEQ_KEY = "forge.seq.v1";

export interface ForgeUser {
  forgeId: string;
  role: RoleKey;
  name: string;
  email?: string;
  phone?: string;
  department?: string;
  register?: string;
  staffId?: string;
  gradYear?: string;
  company?: string;
  password: string;
  createdAt: number;
}

type Listener = () => void;
const listeners = new Set<Listener>();
export function subscribeAuth(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit() {
  listeners.forEach((l) => l());
}

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}
function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, val: T) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(val));
}

export function getUsers(): ForgeUser[] {
  return read<ForgeUser[]>(USERS_KEY, []);
}
function saveUsers(list: ForgeUser[]) {
  write(USERS_KEY, list);
}

const ROLE_PREFIX: Record<RoleKey, string> = {
  student: "STU",
  staff: "STF",
  alumni: "ALM",
  admin: "ADM",
};

export function generateForgeId(role: RoleKey): string {
  const year = new Date().getFullYear();
  const seqMap = read<Record<string, number>>(SEQ_KEY, {});
  const key = `${role}-${year}`;
  const next = (seqMap[key] ?? 0) + 1;
  seqMap[key] = next;
  write(SEQ_KEY, seqMap);
  return `FORGE-${ROLE_PREFIX[role]}-${year}-${String(next).padStart(4, "0")}`;
}

export function getCurrentUser(): ForgeUser | null {
  return read<ForgeUser | null>(CURRENT_KEY, null);
}

export function logout() {
  if (isBrowser()) localStorage.removeItem(CURRENT_KEY);
  emit();
}

export interface SignupInput {
  role: RoleKey;
  name: string;
  email?: string;
  phone?: string;
  department?: string;
  register?: string;
  staffId?: string;
  gradYear?: string;
  company?: string;
  password: string;
}

export function signup(input: SignupInput): { ok: true; user: ForgeUser } | { ok: false; error: string } {
  if (input.role === "admin") return { ok: false, error: "Admin accounts cannot be created." };
  if (!input.name || !input.password) return { ok: false, error: "Name and password are required." };
  const users = getUsers();
  // duplicate check by identifier where present
  const dup = users.find((u) =>
    (input.email && u.email === input.email) ||
    (input.register && u.register === input.register) ||
    (input.staffId && u.staffId === input.staffId),
  );
  if (dup) return { ok: false, error: "An account already exists for this identifier." };

  const user: ForgeUser = {
    forgeId: generateForgeId(input.role),
    role: input.role,
    name: input.name,
    email: input.email,
    phone: input.phone,
    department: input.department,
    register: input.register,
    staffId: input.staffId,
    gradYear: input.gradYear,
    company: input.company,
    password: input.password,
    createdAt: Date.now(),
  };
  users.push(user);
  saveUsers(users);
  write(CURRENT_KEY, user);
  emit();
  return { ok: true, user };
}

export function login(role: RoleKey, identifier: string, password: string):
  | { ok: true; user: ForgeUser }
  | { ok: false; error: string } {
  const id = identifier.trim();
  if (role === "admin") {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      const user: ForgeUser = {
        forgeId: "FORGE-ADM-2026-0001",
        role: "admin",
        name: "System Admin",
        email: "admin@forge.edu",
        password: ADMIN_PASSWORD,
        createdAt: Date.now(),
      };
      write(CURRENT_KEY, user);
      emit();
      return { ok: true, user };
    }
    return { ok: false, error: "Invalid admin credentials." };
  }
  const users = getUsers();
  const user = users.find(
    (u) =>
      u.role === role &&
      (u.forgeId.toLowerCase() === id.toLowerCase() ||
        u.email?.toLowerCase() === id.toLowerCase() ||
        u.register?.toLowerCase() === id.toLowerCase() ||
        u.staffId?.toLowerCase() === id.toLowerCase()),
  );
  if (!user) return { ok: false, error: "No account found for this identifier." };
  if (user.password !== password) return { ok: false, error: "Incorrect password." };
  write(CURRENT_KEY, user);
  emit();
  return { ok: true, user };
}

// Seed demo accounts once so login always works out of the box.
export function seedDemoAccounts() {
  if (!isBrowser()) return;
  const users = getUsers();
  if (users.some((u) => u.register === "23AIDS001")) return;
  const seq: Record<string, number> = { [`student-${new Date().getFullYear()}`]: 0, [`staff-${new Date().getFullYear()}`]: 0, [`alumni-${new Date().getFullYear()}`]: 0 };
  write(SEQ_KEY, seq);
  signupSilently({ role: "student", name: "Joel Smith", department: "AI & DS", register: "23AIDS001", email: "joel@forge.edu", password: "student123" });
  signupSilently({ role: "staff", name: "Dr. Arjun Kumar", department: "AI & DS", staffId: "STF001", email: "arjun@forge.edu", password: "staff123" });
  signupSilently({ role: "alumni", name: "Priya Nair", department: "AI & DS", gradYear: "2018", company: "Google", email: "priya@forge.edu", password: "alumni123" });
  // clear current so seeding doesn't auto-login
  if (isBrowser()) localStorage.removeItem(CURRENT_KEY);
  emit();
}

function signupSilently(input: SignupInput) {
  const users = getUsers();
  const user: ForgeUser = {
    forgeId: generateForgeId(input.role),
    role: input.role,
    name: input.name,
    email: input.email,
    phone: input.phone,
    department: input.department,
    register: input.register,
    staffId: input.staffId,
    gradYear: input.gradYear,
    company: input.company,
    password: input.password,
    createdAt: Date.now(),
  };
  users.push(user);
  saveUsers(users);
}
