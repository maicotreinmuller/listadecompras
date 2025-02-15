import { useState, useEffect } from 'react';

const STORAGE_KEY = 'shopping-list-suggestions';

const DEFAULT_SUGGESTIONS = [
  '🥬 Alface',
  '🥕 Cenoura',
  '🍅 Tomate',
  '🥔 Batata',
  '🧅 Cebola',
  '🥩 Carne Moída',
  '🍗 Frango',
  '🥛 Leite',
  '🧀 Queijo',
  '🥖 Pão',
  '🥚 Ovos',
  '🧻 Papel Higiênico',
  '🧴 Sabonete',
  '🧼 Detergente',
  '🧹 Vassoura',
  '🧂 Sal',
  '🍚 Arroz',
  '🫘 Feijão',
  '🍝 Macarrão',
  '☕ Café',
  '🧃 Suco',
  '🥤 Refrigerante',
  '🍪 Biscoito',
  '🧴 Shampoo',
].sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));

export function useSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>(() => {
    const savedSuggestions = localStorage.getItem(STORAGE_KEY);
    return savedSuggestions ? JSON.parse(savedSuggestions) : DEFAULT_SUGGESTIONS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestions));
  }, [suggestions]);

  const addSuggestion = (item: string) => {
    if (!suggestions.includes(item)) {
      setSuggestions([...suggestions, item].sort((a, b) => 
        a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
      ));
    }
  };

  const removeSuggestion = (item: string) => {
    setSuggestions(suggestions.filter(s => s !== item));
  };

  const filterSuggestions = (query: string): string[] => {
    if (!query.trim()) return [];
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return suggestions.filter(suggestion => {
      const normalizedSuggestion = suggestion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedSuggestion.includes(normalizedQuery);
    });
  };

  return {
    suggestions,
    addSuggestion,
    removeSuggestion,
    filterSuggestions
  };
}