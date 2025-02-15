import React from 'react';
import { formatarMoeda } from '../utils/formatters';

interface TotalBarProps {
  total: number;
  className?: string;
}

export function TotalBar({ total, className = '' }: TotalBarProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-sm font-medium text-gray-600 mb-2">Total da Lista</h2>
        <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          {formatarMoeda(total)}
        </p>
      </div>
    </div>
  );
}