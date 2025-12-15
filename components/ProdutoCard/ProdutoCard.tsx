import React from 'react';
import Link from 'next/link';
import { Produto } from '@/models/interfaces';

interface ProdutoCardProps {
  produto: Produto;
  onAddToCart?: (produto: Produto) => void;
  onRemoveFromCart?: () => void;
}

export default function ProdutoCard({ produto, onAddToCart, onRemoveFromCart }: ProdutoCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col h-full hover:shadow-lg transition">
      <div className="relative w-full h-48 mb-4">
        <img
  src={`https://deisishop.pythonanywhere.com${produto.image}`} 
  alt={produto.title} 
  className="object-contain h-full w-full"
/>
      </div>
      
      <h2 className="font-bold text-lg line-clamp-1">{produto.title}</h2>
      <p className="text-gray-500 text-sm mb-4 capitalize">{produto.category}</p>
      
      <div className="mt-auto flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">
            {Number(produto.price).toFixed(2)} €
          </span>
          
          <Link href={`/produtos/${produto.id}`}>
             <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition">
               + Info
             </button>
          </Link>
        </div>

        {onAddToCart && (
          <button 
            onClick={() => onAddToCart(produto)}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-bold"
          >
            Adicionar ao Carrinho
          </button>
        )}

        {onRemoveFromCart && (
          <button 
            onClick={onRemoveFromCart}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-bold"
          >
            Remover do Carrinho
          </button>
        )}
      </div>
    </div>
  )
}