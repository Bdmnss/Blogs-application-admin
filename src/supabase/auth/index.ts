import { supabase } from "..";

export const login = ({ email, password }: { email: string; password: string }) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};