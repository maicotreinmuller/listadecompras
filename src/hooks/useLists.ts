import { useState, useEffect } from 'react';
import { List } from '../types/List';
import { Item } from '../types/Item';

const STORAGE_KEY = 'shopping-lists';
const ORDER_KEY = 'shopping-lists-order';

export function useLists() {
  const [lists, setLists] = useState<List[]>(() => {
    const savedLists = localStorage.getItem(STORAGE_KEY);
    const savedOrder = localStorage.getItem(ORDER_KEY);
    const parsedLists = savedLists ? JSON.parse(savedLists) : [];
    
    if (savedOrder) {
      const orderMap = new Map(JSON.parse(savedOrder));
      return [...parsedLists].sort((a, b) => 
        (orderMap.get(a.id) || 0) - (orderMap.get(b.id) || 0)
      );
    }
    
    return parsedLists;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    // Save order
    const order = lists.map((list, index) => [list.id, index]);
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }, [lists]);

  const getListItems = (listId: number): Item[] => {
    const savedItems = localStorage.getItem(`shopping-list-items-${listId}`);
    return savedItems ? JSON.parse(savedItems) : [];
  };

  const calculateListTotal = (listId: number): number => {
    const items = getListItems(listId);
    return items
      .filter((item) => item.completo)
      .reduce((total, item) => total + item.valor * item.quantidade, 0);
  };

  const createList = (nome: string) => {
    const novoId =
      lists.length > 0 ? Math.max(...lists.map((l) => l.id)) + 1 : 1;
    const novaLista: List = {
      id: novoId,
      nome,
      dataCriacao: new Date().toISOString(),
      items: [],
    };

    localStorage.setItem(`shopping-list-items-${novoId}`, JSON.stringify([]));

    setLists([...lists, novaLista]);
    return novoId;
  };

  const deleteList = (id: number) => {
    localStorage.removeItem(`shopping-list-items-${id}`);
    setLists(lists.filter((list) => list.id !== id));
  };

  const duplicateList = (id: number) => {
    const list = lists.find((l) => l.id === id);
    if (list) {
      const novoId = Math.max(...lists.map((l) => l.id)) + 1;
      const novaLista: List = {
        ...list,
        id: novoId,
        nome: `${list.nome} (Cópia)`,
        dataCriacao: new Date().toISOString(),
      };

      const itensOriginais = localStorage.getItem(`shopping-list-items-${id}`);
      if (itensOriginais) {
        localStorage.setItem(`shopping-list-items-${novoId}`, itensOriginais);
      }

      setLists([...lists, novaLista]);
      return novoId;
    }
  };

  const clearList = (id: number) => {
    const items = getListItems(id);
    const clearedItems = items.map((item) => ({
      ...item,
      quantidade: 1,
      valor: 0,
      completo: false,
    }));
    localStorage.setItem(
      `shopping-list-items-${id}`,
      JSON.stringify(clearedItems)
    );
    setLists(
      lists.map((list) => (list.id === id ? { ...list, items: [] } : list))
    );
  };

  const renameList = (id: number, newName: string) => {
    setLists(
      lists.map((list) => (list.id === id ? { ...list, nome: newName } : list))
    );
  };

  const reorderLists = (newOrder: List[]) => {
    setLists(newOrder);
  };

  const clearAllData = () => {
    lists.forEach((list) => {
      localStorage.removeItem(`shopping-list-items-${list.id}`);
    });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ORDER_KEY);
    setLists([]);
  };

  return {
    lists,
    createList,
    deleteList,
    duplicateList,
    clearList,
    renameList,
    reorderLists,
    clearAllData,
    calculateListTotal,
    getListItems,
  };
}