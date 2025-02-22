import React from 'react';
import { RiStore3Line, RiFileListLine, RiHome4Line } from 'react-icons/ri';
import { Item } from '../types/Item';

interface BottomNavProps {
  items: Item[];
  onNavigateToGroups: () => void;
  onNavigateToSuggestions: () => void;
  onNavigateToHome: () => void;
}

export function BottomNav({ 
  items, 
  onNavigateToGroups, 
  onNavigateToSuggestions,
  onNavigateToHome 
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="container mx-auto max-w-2xl flex justify-around">
        <button
          onClick={onNavigateToHome}
          className="p-4 text-gray-400 hover:text-violet-600 transition-colors"
          title="Home"
        >
          <RiHome4Line size={24} />
        </button>

        <button
          onClick={onNavigateToGroups}
          className="p-4 text-gray-400 hover:text-violet-600 transition-colors"
          title="Categorias"
        >
          <RiStore3Line size={24} />
        </button>
        
        <button
          onClick={onNavigateToSuggestions}
          className="p-4 text-gray-400 hover:text-violet-600 transition-colors"
          title="Sugestões"
        >
          <RiFileListLine size={24} />
        </button>
      </div>
    </div>
  );
}