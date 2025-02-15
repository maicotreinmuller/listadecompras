import React from 'react';
import { FaTimes, FaLayerGroup, FaTrash, FaShare } from 'react-icons/fa';
import { generateShareText } from '../utils/shareList';
import { Item } from '../types/Item';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  onClearAll: () => void;
  onNavigateToGroups: () => void;
}

export function Sidebar({ isOpen, onClose, items, onClearAll, onNavigateToGroups }: SidebarProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <FaTimes />
          </button>
        </div>
        
        <div className="p-4">
          <button
            onClick={onNavigateToGroups}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg mb-2"
          >
            <FaLayerGroup />
            Gerenciar grupos
          </button>
          
          <button
            onClick={handleShare}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg mb-2"
          >
            <FaShare />
            Compartilhar
          </button>
          
          <button
            onClick={onClearAll}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg"
          >
            <FaTrash />
            Limpar lista
          </button>
        </div>
      </div>
    </div>
  );
}