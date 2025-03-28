import React, { useState } from 'react';
import { RiHome4Line, RiAddLine, RiSettings4Line, RiCalculatorLine } from 'react-icons/ri';
import { Calculator } from './Calculator';

interface FloatingTaskbarProps {
  onNavigateToHome: () => void;
  onNavigateToManagement: () => void;
  onCreateList?: () => void;
}

export function FloatingTaskbar({
  onNavigateToHome,
  onNavigateToManagement,
  onCreateList,
}: FloatingTaskbarProps) {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/80 backdrop-blur-lg rounded-full shadow-lg px-6 py-3 flex items-center gap-8">
          <button
            onClick={onNavigateToHome}
            className="text-gray-600 hover:text-violet-600 hover:border-violet-600 border-2 border-transparent rounded-lg p-2 transition-colors"
            title="Início"
          >
            <RiHome4Line size={24} />
          </button>
          
          {onCreateList && (
            <button
              onClick={onCreateList}
              className="text-gray-600 hover:text-violet-600 hover:border-violet-600 border-2 border-transparent rounded-lg p-2 transition-colors"
              title="Nova Lista"
            >
              <RiAddLine size={24} />
            </button>
          )}
          
          <button
            onClick={onNavigateToManagement}
            className="text-gray-600 hover:text-violet-600 hover:border-violet-600 border-2 border-transparent rounded-lg p-2 transition-colors"
            title="Gerenciar"
          >
            <RiSettings4Line size={24} />
          </button>

          <button
            onClick={() => setShowCalculator(true)}
            className="text-gray-600 hover:text-violet-600 hover:border-violet-600 border-2 border-transparent rounded-lg p-2 transition-colors"
            title="Calculadora"
          >
            <RiCalculatorLine size={24} />
          </button>
        </div>
      </div>

      <Calculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />
    </>
  );
}