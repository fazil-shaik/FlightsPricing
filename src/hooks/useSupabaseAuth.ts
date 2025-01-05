import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useSupabaseAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setState(prev => ({ ...prev, session }));

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setState(prev => ({ ...prev, session }));
        });

        return () => subscription.unsubscribe();
      } catch (err) {
        setState(prev => ({ ...prev, error: err.message }));
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    }

    initAuth();
  }, []);

  return state;
}