import React, { useState } from 'react';
import { Item } from '../types/Item';
import { ItemCard } from './ItemCard';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { formatarMoeda } from '../utils/formatters';

interface ItemGroupProps {
  grupo: string;
  items: Item[];
  onToggleComplete: (id: number) => void;
  onQuantidadeChange: (id: number, quantidade: number) => void;
  onValorChange: (id: number, valor: number) => void;
  onDelete: (id: number) => void;
}

export function ItemGroup({
  grupo,
  items,
  onToggleComplete,
  onQuantidadeChange,
  onValorChange,
  onDelete,
}: ItemGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
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