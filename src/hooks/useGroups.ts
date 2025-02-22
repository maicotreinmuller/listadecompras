import { useState, useEffect } from 'react';

const STORAGE_KEY = 'shopping-list-groups';

const DEFAULT_GROUPS = [
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
  '📦 Outros'
].sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));

// Função auxiliar para ordenar grupos de A a Z
const sortGroups = (groups: string[]): string[] => {
  return [...groups].sort((a, b) => 
    a.localeCompare(b, 'pt-BR', { 
      sensitivity: 'base',  // Ignora diferenças de maiúsculas/minúsculas
      numeric: true        // Ordena números corretamente
    })
  );
};

export function useGroups() {
  const [groups, setGroups] = useState<string[]>(() => {
    const savedGroups = localStorage.getItem(STORAGE_KEY);
    return savedGroups ? sortGroups(JSON.parse(savedGroups)) : DEFAULT_GROUPS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  const addGroup = (group: string) => {
    if (!groups.includes(group)) {
      setGroups(sortGroups([...groups, group]));
    }
  };

  const removeGroup = (group: string) => {
    setGroups(sortGroups(groups.filter(g => g !== group)));
  };

  return { groups, addGroup, removeGroup };
}