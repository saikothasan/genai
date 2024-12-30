import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center gap-2 text-gray-500">
    <Loader2 className="w-5 h-5 animate-spin" />
    <span>Loading...</span>
  </div>
);