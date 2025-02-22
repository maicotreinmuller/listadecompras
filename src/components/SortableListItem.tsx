import React from 'react';
import {
  RiShareLine,
  RiFileCopyLine,
  RiDeleteBin7Line,
  RiEditLine,
  RiBrushLine,
  RiDragMove2Line,
} from 'react-icons/ri';
import { formatarMoeda } from '../utils/formatters';
import { List } from '../types/List';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableListItemProps {
  list: List;
  total: number;
  onSelect: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onShare: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function SortableListItem({
  list,
  total,
  onSelect,
  onRename,
  onDuplicate,
  onShare,
  onClear,
  onDelete,
}: SortableListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:bg-slate-50"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-medium">{list.nome}</h2>
            <p className="text-sm text-gray-500">
              {new Date(list.dataCriacao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        <span className="text-lg font-bold text-violet-600">
          {formatarMoeda(total)}
        </span>
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onRename}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          title="Renomear lista"
        >
          <RiEditLine size={20} />
        </button>

        <button
          onClick={onDuplicate}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          title="Duplicar lista"
        >
          <RiFileCopyLine size={20} />
        </button>

        <button
          onClick={onShare}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          title="Compartilhar"
        >
          <RiShareLine size={20} />
        </button>

        <button
          onClick={onClear}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          title="Limpar dados"
        >
          <RiBrushLine size={20} />
        </button>

        <button
          {...attributes}
          {...listeners}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-grab active:cursor-grabbing"
          title="Mover lista"
          onClick={(e) => e.stopPropagation()}
        >
          <RiDragMove2Line size={20} />
        </button>

        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          title="Excluir lista"
        >
          <RiDeleteBin7Line size={20} />
        </button>
      </div>
    </div>
  );
}