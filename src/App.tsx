import React from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { FlightSearch } from './components/FlightSearch';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { useSupabaseAuth } from './hooks/useSupabaseAuth';

function App() {
  const { session, loading, error } = useSupabaseAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Flight Search</h1>
            <p className="text-blue-700">Find the best deals on flights</p>
          </div>
          
          {!session ? (
            <AuthForm onSuccess={() => {}} />
          ) : (
            <>
              <div className="w-full flex justify-end">
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  Sign Out
                </button>
              </div>
              <FlightSearch />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;