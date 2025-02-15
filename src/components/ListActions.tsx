import React from 'react';
import { FaShare, FaTrash } from 'react-icons/fa';
import { generateShareText } from '../utils/shareList';
import { Item } from '../types/Item';

interface ListActionsProps {
  items: Item[];
  onClearAll: () => void;
}

export function ListActions({ items, onClearAll }: ListActionsProps) {
  const handleShare = async () => {
    const texto = generateShareText(items);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lista de Compras',
          text: texto
        });
      } catch (err) {
        copyToClipboard(texto);
      }
    } else {
      copyToClipboard(texto);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Lista copiada para a área de transferência!');
  };

  return (
    <div className="flex gap-3 mt-6">
      <button
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        <FaShare />
        Compartilhar
      </button>
      <button
        onClick={onClearAll}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        <FaTrash />
        Limpar
      </button>
    </div>
  );
}