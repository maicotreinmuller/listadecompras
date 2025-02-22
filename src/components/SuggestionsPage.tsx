import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSuggestions } from '../hooks/useSuggestions';
import { useShoppingList } from '../hooks/useShoppingList';
import { FloatingMenu } from './FloatingMenu';

interface SuggestionsPageProps {
  onNavigateToGroups: () => void;
  onNavigateToSuggestions: () => void;
  onNavigateToHome: () => void;
}

export function SuggestionsPage({
  onNavigateToGroups,
  onNavigateToSuggestions,
  onNavigateToHome,
}: SuggestionsPageProps) {
  const { suggestions, addSuggestion, removeSuggestion } = useSuggestions();
  const { items } = useShoppingList();
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      addSuggestion(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Sugestões de Itens</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Novo item"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border-0 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaPlus size={16} />
            </button>
          </form>

          <div className="space-y-2">
            {suggestions.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <span className="text-sm font-medium">{item}</span>
                <button
                  onClick={() => removeSuggestion(item)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingMenu
        onNavigateToHome={onNavigateToHome}
        onNavigateToGroups={onNavigateToGroups}
        onNavigateToSuggestions={onNavigateToSuggestions}
      />
    </div>
  );
}