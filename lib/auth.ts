import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { UserRole } from "@/data/mock-data";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export type AdminSession =
  | {
      mode: "demo";
      role: UserRole;
      displayName: string;
      userId: string;
    }
  | {
      mode: "authenticated";
      role: UserRole;
      displayName: string;
      userId: string;
      email: string;
    };

function isUserRole(value: unknown): value is UserRole {
  return (
    value === "super_admin" ||
    value === "nhan_vien" ||
    value === "cong_tac_vien"
  );
}

function readRoleFromUser(user: User) {
  const appRole = user.app_metadata?.role;
  if (isUserRole(appRole)) {
    return appRole;
  }

  const userRole = user.user_metadata?.role;
  if (isUserRole(userRole)) {
    return userRole;
  }

  return null;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return {
      mode: "demo",
      role: "super_admin",
      displayName: "Demo Super Admin",
      userId: "demo-super-admin",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  let profileRole: UserRole | null = null;
  let displayName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : user.email ?? "Nguoi dung";

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profile && isUserRole(profile.role)) {
    profileRole = profile.role;
    if (typeof profile.full_name === "string" && profile.full_name.trim()) {
      displayName = profile.full_name;
    }
  }

  const role = profileRole ?? readRoleFromUser(user);
  if (!role) {
    return null;
  }

  return {
    mode: "authenticated",
    role,
    displayName,
    userId: user.id,
    email: user.email ?? "",
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
