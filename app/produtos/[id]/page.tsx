"use client"; // Necessário para usar useState

import { useState, use } from 'react'; // 'use' para desenrolar params no Next 15
import Image from 'next/image';
import Link from 'next/link';
import { produtos } from '@/listas/dados';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProdutoPage({ params }: Props) {
  // 1. Resolvemos os params (Next.js 15)
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);
  
  // 2. Estado para controlar se o produto foi removido
  const [visivel, setVisivel] = useState(true);

  // 3. Encontrar o produto nos dados
  const produto = produtos.find((p) => p.id === id);

  if (!produto) return <div className="p-10 text-center">Produto não encontrado.</div>;

  // 4. Lógica de "Produto Removido"
  if (!visivel) {
    return (
      <div className="p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Produto Removido!</h2>
        <button 
          onClick={() => setVisivel(true)} 
          className="text-blue-500 underline"
        >
          Restaurar Produto
        </button>
        <br />
        <Link href="/produtos" className="text-gray-500 hover:underline">Voltar à loja</Link>
      </div>
    );
  }

  // 5. Apresentação Normal
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="border rounded-2xl p-6 shadow-lg bg-white">
        <div className="relative w-full h-64 mb-6 bg-gray-100 rounded">
          <Image src={produto.imagem} alt={produto.nome} fill className="object-contain" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{produto.nome}</h1>
        <p className="text-gray-600 mb-4">Categoria: {produto.categoria}</p>
        <p className="text-4xl text-blue-600 font-bold mb-6">{produto.preco}€</p>

        <button 
          onClick={() => setVisivel(false)}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition"
        >
          Remover Produto
        </button>
      </div>
      <div className="mt-4 text-center">
        <Link href="/produtos" className="text-blue-600 underline">← Voltar</Link>
      </div>
    </div>
  );
}