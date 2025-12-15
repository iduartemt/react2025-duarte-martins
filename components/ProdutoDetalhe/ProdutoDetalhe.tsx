import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/models/interfaces';

interface ProdutoDetalheProps {
  produto: Produto;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Coluna da Imagem */}
        <div className="relative w-full h-96 bg-gray-50 rounded-lg">
          <Image 
             src={`https://deisishop.pythonanywhere.com${produto.image}`} 
             alt={produto.title}
             fill
             className="object-contain p-4"
          />
        </div>

        {/* Coluna dos Detalhes */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{produto.title}</h1>
          <p className="text-gray-500 capitalize mb-4 text-lg">{produto.category}</p>
          
          <div className="text-3xl font-bold text-blue-600 mb-6">
            {produto.price.toFixed(2)} €
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {produto.description}
          </p>

          <div className="flex items-center gap-2 mb-8 bg-yellow-50 p-3 rounded w-fit">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-bold">{produto.rating.rate}</span>
            <span className="text-gray-500 text-sm">({produto.rating.count} avaliações)</span>
          </div>

          {/* Botão Voltar */}
          <Link href="/produtos">
            <button className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition w-full md:w-auto">
              Voltar à Loja
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}