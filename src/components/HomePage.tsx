import React, { useState } from 'react';
import {
  RiShareLine,
  RiFileCopyLine,
  RiDeleteBin7Line,
  RiEditLine,
  RiBrushLine,
} from 'react-icons/ri';
import { useLists } from '../hooks/useLists';
import { formatarMoeda } from '../utils/formatters';
import { generateShareText } from '../utils/shareList';
import { useShoppingList } from '../hooks/useShoppingList';
import { FloatingMenu } from './FloatingMenu';

interface HomePageProps {
  onBack: () => void;
  onSelectList: (listId: number) => void;
  onNavigateToManagement: () => void;
}

export function HomePage({
  onBack,
  onSelectList,
  onNavigateToManagement,
}: HomePageProps) {
  const {
    lists,
    createList,
    deleteList,
    duplicateList,
    clearList,
    renameList,
    calculateListTotal,
    getListItems,
  } = useLists();
  const { items } = useShoppingList();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState<number | null>(null);
  const [newListName, setNewListName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      setShowCreateModal(false);
    }
  };

  const handleRenameList = (e: React.FormEvent) => {
    e.preventDefault();
    if (showRenameModal !== null && newListName.trim()) {
      renameList(showRenameModal, newListName.trim());
      setNewListName('');
      setShowRenameModal(null);
    }
  };

  const handleShare = async (listId: number) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;

    const listItems = getListItems(listId);
    const texto = generateShareText(listItems, list.nome);

    if (navigator.share) {
      try {
        await navigator.share({
          title: list.nome,
          text: texto,
        });
      } catch (err) {
        shareViaWhatsApp(texto);
      }
    } else {
      shareViaWhatsApp(texto);
    }
  };

  const shareViaWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleDeleteList = (id: number) => {
    deleteList(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-4">
          {lists.map((list) => {
            const total = calculateListTotal(list.id);

            return (
              <div
                key={list.id}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:bg-slate-50"
                onClick={() => onSelectList(list.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium">{list.nome}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(list.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-violet-600">
                    {formatarMoeda(total)}
                  </span>
                </div>

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setNewListName(list.nome);
                      setShowRenameModal(list.id);
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Renomear lista"
                  >
                    <RiEditLine size={20} />
                  </button>

                  <button
                    onClick={() => duplicateList(list.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Duplicar lista"
                  >
                    <RiFileCopyLine size={20} />
                  </button>

                  <button
                    onClick={() => handleShare(list.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Compartilhar"
                  >
                    <RiShareLine size={20} />
                  </button>

                  <button
                    onClick={() => clearList(list.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Limpar dados"
                  >
                    <RiBrushLine size={20} />
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(list.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg ml-auto"
                    title="Excluir lista"
                  >
                    <RiDeleteBin7Line size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {lists.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            <p>Nenhuma lista criada</p>
            <p className="text-sm">Clique no botão + para criar uma nova lista</p>
          </div>
        )}
      </div>

      <FloatingMenu
        onNavigateToHome={() => {}}
        onNavigateToManagement={onNavigateToManagement}
        onCreateList={() => setShowCreateModal(true)}
        showCreateList={true}
      />

      {/* Modal de criar lista */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Nova Lista</h2>

            <form onSubmit={handleCreateList}>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Nome da lista"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border-0 focus:ring-2 focus:ring-violet-500 outline-none mb-4"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                  disabled={!newListName.trim()}
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de renomear lista */}
      {showRenameModal !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowRenameModal(null)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Renomear Lista</h2>

            <form onSubmit={handleRenameList}>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Novo nome da lista"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border-0 focus:ring-2 focus:ring-violet-500 outline-none mb-4"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRenameModal(null)}
                  className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                  disabled={!newListName.trim()}
                >
                  Renomear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmar exclusão */}
      {showDeleteConfirm !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-25"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg">
            <button
              onClick={() => handleDeleteList(showDeleteConfirm)}
              className="w-full p-4 text-center text-red-600 text-base font-medium hover:bg-red-50 active:bg-red-100"
            >
              Excluir Lista
            </button>
            <button
              onClick={() => setShowDeleteConfirm(null)}
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