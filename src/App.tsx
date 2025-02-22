import React, { useState, useEffect } from 'react';
import { AddItemBar } from './components/AddItemBar';
import { ItemGroup } from './components/ItemGroup';
import { TotalBar } from './components/TotalBar';
import { ManagementPage } from './components/ManagementPage';
import { HomePage } from './components/HomePage';
import { useShoppingList } from './hooks/useShoppingList';
import { FloatingTaskbar } from './components/FloatingTaskbar';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'management'>('home');
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  const {
    items,
    adicionarItem,
    toggleItem,
    atualizarQuantidade,
    atualizarValor,
    excluirItem,
    limparTudo,
    calcularTotal,
    agruparItens
  } = useShoppingList(currentListId);

  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Disable zoom
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  // Handle back button/gesture
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      e.preventDefault();
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setCurrentListId(null);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [currentPage]);

  const confirmarExclusao = (id: number) => {
    setItemToDelete(id);
  };

  const handleExcluirItem = () => {
    if (itemToDelete !== null) {
      excluirItem(itemToDelete);
      setItemToDelete(null);
    }
  };

  const handleLimparTudo = () => {
    limparTudo();
    setShowClearConfirm(false);
  };

  const handleSelectList = (listId: number) => {
    setCurrentListId(listId);
    setCurrentPage('list');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    setCurrentListId(null);
  };

  if (currentPage === 'home') {
    return (
      <HomePage
        onBack={() => setCurrentPage('list')}
        onSelectList={handleSelectList}
        onNavigateToManagement={() => setCurrentPage('management')}
      />
    );
  }

  if (currentPage === 'management') {
    return (
      <>
        <ManagementPage
          onNavigateToHome={handleNavigateToHome}
        />
        <FloatingTaskbar
          onNavigateToHome={handleNavigateToHome}
          onNavigateToManagement={() => setCurrentPage('management')}
        />
      </>
    );
  }

  const total = calcularTotal();
  const itemsAgrupados = agruparItens();

  return (
    <>
      <div className="min-h-screen bg-slate-100 pb-20">
        <div className="container mx-auto max-w-2xl px-4 py-6">
          <TotalBar total={total} className="mb-6" />
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <AddItemBar onAdd={adicionarItem} />
          </div>
          
          <div className="space-y-4">
            {Object.entries(itemsAgrupados).map(([grupo, groupItems]) => (
              <ItemGroup
                key={grupo}
                grupo={grupo}
                items={groupItems}
                onToggleComplete={toggleItem}
                onQuantidadeChange={atualizarQuantidade}
                onValorChange={atualizarValor}
                onDelete={confirmarExclusao}
              />
            ))}
          </div>
        </div>

        <FloatingTaskbar
          onNavigateToHome={handleNavigateToHome}
          onNavigateToManagement={() => setCurrentPage('management')}
        />
      </div>

      {/* Modal de excluir item */}
      <div 
        className={`fixed inset-0 z-50 bg-black bg-opacity-25 ${
          itemToDelete !== null ? 'flex items-center justify-center' : 'hidden'
        }`}
        onClick={() => setItemToDelete(null)}
      >
        <div 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={handleExcluirItem}
            className="w-full p-4 text-center text-red-600 text-base font-medium hover:bg-red-50 active:bg-red-100"
          >
            Excluir Item
          </button>
          <button
            onClick={() => setItemToDelete(null)}
            className="w-full p-4 text-center text-gray-500 text-base hover:bg-gray-50 active:bg-gray-100 border-t border-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Modal de limpar lista */}
      <div 
        className={`fixed inset-0 z-50 bg-black bg-opacity-25 ${
          showClearConfirm ? 'flex items-center justify-center' : 'hidden'
        }`}
        onClick={() => setShowClearConfirm(false)}
      >
        <div 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={handleLimparTudo}
            className="w-full p-4 text-center text-red-600 text-base font-medium hover:bg-red-50 active:bg-red-100"
          >
            Limpar Lista
          </button>
          <button
            onClick={() => setShowClearConfirm(false)}
            className="w-full p-4 text-center text-gray-500 text-base hover:bg-gray-50 active:bg-gray-100 border-t border-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}