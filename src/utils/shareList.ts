import { Item } from '../types/Item';
import { formatarMoeda } from './formatters';

function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

export function generateShareText(items: Item[], listTitle?: string): string {
  const grupos = items.reduce((acc, item) => {
    if (!acc[removeEmojis(item.grupo)]) {
      acc[removeEmojis(item.grupo)] = [];
    }
    acc[removeEmojis(item.grupo)].push({
      ...item,
      nome: removeEmojis(item.nome)
    });
    return acc;
  }, {} as Record<string, Item[]>);

  let texto = '';
  
  // Adiciona o título personalizado se existir
  if (listTitle) {
    texto += `*${listTitle}*\n\n`;
  } else {
    texto += '*Lista de Compras*\n\n';
  }

  // Detalhes por grupo
  Object.entries(grupos).forEach(([grupo, itensGrupo]) => {
    texto += `*${grupo}*\n`;
    
    // Ordenar itens por nome
    const itensSorted = [...itensGrupo].sort((a, b) => a.nome.localeCompare(b.nome));

    itensSorted.forEach(item => {
      const quantidade = `${item.quantidade}x `;
      const valor = item.valor > 0 ? `${formatarMoeda(item.valor)}` : '';
      
      texto += `${quantidade}${item.nome} ${valor ? `- ${valor}` : ''}\n`;
    });
    texto += '\n';
  });

  // Total geral no final
  const totalGeral = items.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);
  texto += `*Total: ${formatarMoeda(totalGeral)}*`;

  return texto;
}