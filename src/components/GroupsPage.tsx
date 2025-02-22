import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGroups } from '../hooks/useGroups';
import { useShoppingList } from '../hooks/useShoppingList';
import { FloatingMenu } from './FloatingMenu';

interface GroupsPageProps {
  onNavigateToGroups: () => void;
  onNavigateToSuggestions: () => void;
  onNavigateToHome: () => void;
}

export function GroupsPage({
  onNavigateToGroups,
  onNavigateToSuggestions,
  onNavigateToHome,
}: GroupsPageProps) {
  const { groups, addGroup, removeGroup } = useGroups();
  const { items } = useShoppingList();
  const [newGroup, setNewGroup] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroup.trim()) {
      addGroup(newGroup.trim());
      setNewGroup('');
    }
  };

  const sortedGroups = [...groups].sort((a, b) =>
    a.localeCompare(b, 'pt', { sensitivity: 'base' })
  );

  const suggestedGroups = [
    '🥬 Hortifruti',
    '🥩 Carnes',
    '🥛 Laticínios',
    '🥖 Padaria',
    '🥫 Mercearia',
    '🧃 Bebidas',
    '🧹 Limpeza',
    '🧴 Higiene',
    '🧊 Congelados',
    '🥜 Cereais',
    '🍝 Massas',
    '🥫 Enlatados',
    '🧂 Temperos',
    '🍬 Doces',
    '🐶 Pet Shop',
    '📦 Outros',
  ].sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' }));

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Categorias</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="Nova categoria"
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
            {sortedGroups.map((group) => (
              <div
                key={group}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <span className="text-sm font-medium">{group}</span>
                <button
                  onClick={() => removeGroup(group)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-medium mb-4">Categorias Sugeridas</h2>
          <div className="grid grid-cols-2 gap-2">
            {suggestedGroups.map((group) => (
              <button
                key={group}
                onClick={() => addGroup(group)}
                className="p-2 text-sm bg-slate-50 rounded-lg hover:bg-slate-100 text-left"
              >
                {group}
              </button>
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