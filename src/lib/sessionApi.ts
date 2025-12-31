import { supabase } from "./supabase/client";

export type StudySession = {
  id: number;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  total_duration_seconds: number;
};

export async function fetchCompletedSessions(): Promise<StudySession[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("study_session")
    .select("*")
    .eq("user_id", user.id)
    .order("started_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as StudySession[];
}

export async function startSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not Authenticated");

  const { error } = await supabase.from("study_session").insert({
    user_id: user.id,
    started_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function endSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.rpc("end_active_session");

  if (error) throw error;
}
