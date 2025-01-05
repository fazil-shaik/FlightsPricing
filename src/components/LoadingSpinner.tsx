import React from 'react';
import { Plane } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
      <div className="animate-spin">
        <Plane className="h-8 w-8 text-pink-600" />
      </div>
    </div>
  );
}