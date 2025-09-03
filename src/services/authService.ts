// src/services/authService.ts
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";


export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export const authService = {
  // authService.ts
  async signUpWithEmail(email: string, password: string, firstName: string, lastName: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("User not created");

    // Insert profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email,
        first_name: firstName,
        last_name: lastName,
      })
      .select()
      .single();

    if (profileError) throw profileError;

    // ✅ Instead of calling setUser, just return the profile
    return profile;
  },


  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) return null;
    return data;
  },
};
