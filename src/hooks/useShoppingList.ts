import { useState, useEffect } from 'react';
import { Item } from '../types/Item';

const STORAGE_KEY_PREFIX = 'shopping-list-items-';

export function useShoppingList(listId?: number | null) {
  const [items, setItems] = useState<Item[]>(() => {
    if (!listId) return [];
    const savedItems = localStorage.getItem(`${STORAGE_KEY_PREFIX}${listId}`);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    if (listId) {
      const savedItems = localStorage.getItem(`${STORAGE_KEY_PREFIX}${listId}`);
      setItems(savedItems ? JSON.parse(savedItems) : []);
    } else {
      setItems([]);
    }
  }, [listId]);

  useEffect(() => {
    if (listId) {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}${listId}`,
        JSON.stringify(items)
      );
    }
  }, [items, listId]);

  const adicionarItem = (nome: string, grupo: string) => {
    if (!listId) return;

    const novoId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const novoItem = {
      id: novoId,
      nome,
      quantidade: 1,
      valor: 0,
      completo: false,
      grupo,
    };
    setItems([...items, novoItem]);
  };

  const toggleItem = (id: number) => {
    if (!listId) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completo: !item.completo } : item
      )
    );
  };

  const atualizarQuantidade = (id: number, quantidade: number) => {
    if (!listId) return;
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  const atualizarValor = (id: number, valor: number) => {
    if (!listId) return;
    setItems(items.map((item) => (item.id === id ? { ...item, valor } : item)));
  };

  const excluirItem = (id: number) => {
    if (!listId) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const limparTudo = () => {
    if (!listId) return;
    // Ao invés de remover os itens, apenas zera as quantidades e valores
    setItems(
      items.map((item) => ({
        ...item,
        quantidade: 1,
        valor: 0,
        completo: false,
      }))
    );
  };

  const calcularTotal = () => {
    return items
      .filter((item) => item.completo)
      .reduce((acc, item) => acc + item.valor * item.quantidade, 0);
  };

  const calcularTotalGrupo = (grupo: string) => {
    return items
      .filter((item) => item.grupo === grupo && item.completo)
      .reduce((acc, item) => acc + item.valor * item.quantidade, 0);
  };

  const agruparItens = () => {
    return items.reduce((grupos, item) => {
      const grupo = item.grupo;
      if (!grupos[grupo]) {
        grupos[grupo] = [];
      }
      grupos[grupo].push(item);
      return grupos;
    }, {} as Record<string, Item[]>);
  };

  return {
    items,
    adicionarItem,
    toggleItem,
    atualizarQuantidade,
    atualizarValor,
    excluirItem,
    limparTudo,
    calcularTotal,
    calcularTotalGrupo,
    agruparItens,
  };
}
