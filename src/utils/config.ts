interface SupabaseConfig {
  supabaseUrl: string;
  supabaseKey: string;
}

export function getSupabaseConfig(): SupabaseConfig {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Database connection not configured. Please click the "Connect to Supabase" button in the top right corner.'
    );
  }

  return { supabaseUrl, supabaseKey };
}