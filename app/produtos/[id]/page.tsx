'use client'

import { use } from 'react'; // Necessário no Next.js 15 para params
import useSWR from 'swr';
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe';
import { Produto } from '@/models/interfaces';

// Função fetcher padrão
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar produto');
  return res.json();
};

// Interface para os params (Promise no Next 15)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProdutoPage({ params }: PageProps) {
  // 1. Desembrulhar os params (use é obrigatório aqui)
  const { id } = use(params);

  // 2. Buscar dados do produto específico na API
  const { data, error, isLoading } = useSWR<Produto>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  );

  // 3. Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 4. Erro
  if (error || !data) {
    return <div className="p-10 text-center text-red-500">Produto não encontrado ou erro na API.</div>;
  }

  // 5. Renderizar o componente de detalhes com os dados da API
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <ProdutoDetalhe produto={data} />
    </div>
  );
}