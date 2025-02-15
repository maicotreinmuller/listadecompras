import React, { useState, useRef, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGroups } from '../hooks/useGroups';
import { useSuggestions } from '../hooks/useSuggestions';

interface AddItemBarProps {
  onAdd: (nome: string, grupo: string) => void;
}

export function AddItemBar({ onAdd }: AddItemBarProps) {
  const { groups } = useGroups();
  const { filterSuggestions } = useSuggestions();
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSuggestions(filterSuggestions(nome));
  }, [nome]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && grupo.trim()) {
      onAdd(nome.trim(), grupo.trim());
      setNome('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNome(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <select
        value={grupo}
        onChange={(e) => setGrupo(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-slate-50 border-0 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
      >
        <option value="" disabled>
          Selecione um grupo
        </option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Nome do item"
            className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border-0 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
            disabled={!nome.trim() || !grupo.trim()}
          >
            <FaPlus size={16} />
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}