import React, { useState } from 'react';
import { FaCheck, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatters';
import { handleCurrencyInput, currencyToNumber } from '../utils/currencyInput';

interface ItemCardProps {
  item: Item;
  onToggleComplete: (id: number) => void;
  onQuantidadeChange: (id: number, quantidade: number) => void;
  onValorChange: (id: number, valor: number) => void;
  onDelete: (id: number) => void;
}

export function ItemCard({
  item,
  onToggleComplete,
  onQuantidadeChange,
  onValorChange,
  onDelete,
}: ItemCardProps) {
  const [inputValue, setInputValue] = useState(formatarMoeda(item.valor));
  const [showMenu, setShowMenu] = useState(false);

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = handleCurrencyInput(e.target.value);
    setInputValue(newValue);
    onValorChange(item.id, currencyToNumber(newValue));
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm transition-all ${
        item.completo ? 'bg-opacity-75' : ''
      }`}
    >
      <div className="p-3">
        {/* Linha Superior: Checkbox, Nome e Menu */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => onToggleComplete(item.id)}
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
              item.completo
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 text-transparent hover:border-green-500'
            }`}
          >
            <FaCheck size={12} />
          </button>

          <span
            className={`flex-1 text-sm font-medium truncate ${
              item.completo ? 'line-through text-gray-400' : 'text-gray-700'
            }`}
          >
            {item.nome}
          </span>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Linha Inferior: Quantidade, Valor e Total */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center bg-gray-50 rounded-md border border-gray-100">
            <button
              onClick={() =>
                onQuantidadeChange(item.id, Math.max(1, item.quantidade - 1))
              }
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-violet-600"
            >
              <FaMinus size={10} />
            </button>
            <span className="w-8 text-center font-medium text-gray-700">
              {item.quantidade}
            </span>
            <button
              onClick={() => onQuantidadeChange(item.id, item.quantidade + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-violet-600"
            >
              <FaPlus size={10} />
            </button>
          </div>

          <span className="text-gray-400">×</span>

          <input
            type="tel"
            value={inputValue}
            onChange={handleValorChange}
            className="w-20 h-8 px-2 text-right text-sm border border-gray-100 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            inputMode="numeric"
          />

          <span className="text-gray-400">=</span>

          <span className="font-medium text-violet-600 ml-auto">
            {formatarMoeda(item.quantidade * item.valor)}
          </span>
        </div>
      </div>

      {/* Menu de Ações */}
      {showMenu && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-25"
          onClick={() => setShowMenu(false)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg">
            <button
              onClick={() => {
                onDelete(item.id);
                setShowMenu(false);
              }}
              className="w-full p-4 text-center text-red-600 text-base font-medium hover:bg-red-50 active:bg-red-100"
            >
              Excluir Item
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full p-4 text-center text-gray-500 text-base hover:bg-gray-50 active:bg-gray-100 border-t border-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}