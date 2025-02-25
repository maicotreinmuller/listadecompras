import React, { useState } from 'react';
import { Item } from '../types/Item';
import { ItemCard } from './ItemCard';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';
import { formatarMoeda } from '../utils/formatters';

interface ItemGroupProps {
  grupo: string;
  items: Item[];
  onToggleComplete: (id: number) => void;
  onQuantidadeChange: (id: number, quantidade: number) => void;
  onValorChange: (id: number, valor: number) => void;
  onDelete: (id: number) => void;
  onAdd: (nome: string, grupo: string) => void;
}

export function ItemGroup({
  grupo,
  items,
  onToggleComplete,
  onQuantidadeChange,
  onValorChange,
  onDelete,
  onAdd,
}: ItemGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAdd(newItemName.trim(), grupo);
      setNewItemName('');
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.valor * item.quantidade, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between text-sm font-medium text-gray-600 mb-3 px-2 hover:text-gray-700"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <FaChevronDown size={12} />
          ) : (
            <FaChevronRight size={12} />
          )}
          <span>{grupo}</span>
          <span className="text-gray-400 text-sm">({items.length})</span>
        </div>
        <span className="text-violet-600 font-medium">
          {formatarMoeda(subtotal)}
        </span>
      </button>

      <div className={`space-y-2 ${isExpanded ? '' : 'hidden'}`}>
        {/* Input para adicionar novo item */}
        <form onSubmit={handleAddItem} className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Adicionar item"
            className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border-0 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
            disabled={!newItemName.trim()}
          >
            <FaPlus size={16} />
          </button>
        </form>

        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onToggleComplete={onToggleComplete}
            onQuantidadeChange={onQuantidadeChange}
            onValorChange={onValorChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}