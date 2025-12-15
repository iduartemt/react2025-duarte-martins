'use client'

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Produto } from '@/models/interfaces';
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json();
};

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Produto[]>(
    'https://deisishop.pythonanywhere.com/products',
    fetcher
  );

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Produto[]>([]);
  const [cart, setCart] = useState<Produto[]>([]);

  // --- NOVOS ESTADOS (Requisitos do exercício) ---
  const [isStudent, setIsStudent] = useState(false); // Checkbox Estudante
  const [coupon, setCoupon] = useState('');          // Input Cupão
  const [message, setMessage] = useState('');        // Resposta da API

  // Carregar carrinho do localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Guardar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filtro de pesquisa
  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((produto) =>
          produto.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, data]);

  const addToCart = (produto: Produto) => {
    setCart([...cart, produto]);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // --- FUNÇÃO DE COMPRAR (Atualizada com Fetch) ---
  const buy = async () => {
    try {
      const res = await fetch('https://deisishop.pythonanywhere.com/buy', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          products: cart.map(produto => produto.id),
          name: "", // Nome vazio conforme a imagem/enunciado
          student: isStudent,
          coupon: coupon
        })
      });

      if (!res.ok) {
        throw new Error(`Erro: ${res.statusText}`);
      }

      const responseData = await res.json();
      
      // Renderizar a resposta
      setMessage(`Compra com sucesso! Referência: ${responseData.reference} | Valor: ${responseData.totalCost}€`);
      
      // Limpar o carrinho após sucesso
      setCart([]); 
      
    } catch (error) {
      console.error(error);
      setMessage("Erro ao realizar a compra.");
    }
  };

  if (error) return <div>Erro ao carregar.</div>;
  if (isLoading) return <div className="p-10 text-center">A carregar...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10 flex flex-col md:flex-row">
      
      {/* ESQUERDA: LISTA DE PRODUTOS */}
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-6">Produtos</h1>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded mb-6 w-full"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              produto={produto} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </div>

      {/* DIREITA: CARRINHO E CHECKOUT */}
      <div className="w-full md:w-1/4 p-4 bg-white border-l border-gray-200 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
        
        {/* Lista do Carrinho */}
        <div className="space-y-4 mb-6">
          {cart.map((produto, index) => (
            <ProdutoCard 
              key={index}
              produto={produto}
              onRemoveFromCart={() => removeFromCart(index)}
            />
          ))}
          {cart.length === 0 && <p className="text-gray-500">Carrinho vazio.</p>}
        </div>
        
        {/* --- ZONA DE CHECKOUT (Novos Inputs) --- */}
        <div className="border-t pt-4 space-y-3">
          
          {/* Checkbox Estudante */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isStudent} 
              onChange={(e) => setIsStudent(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Estudante DEISI?</span>
          </label>

          {/* Input Cupão */}
          <input 
            type="text" 
            placeholder="Inserir cupão..." 
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />

          {/* Total */}
          <div className="text-xl font-bold text-right">
            Total: {cart.reduce((total, item) => total + item.price, 0).toFixed(2)} €
          </div>

          {/* Botão Comprar */}
          <button 
            onClick={buy} 
            disabled={cart.length === 0} // Desativa se vazio
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-700 disabled:bg-gray-400"
          >
            Comprar
          </button>

          {/* Renderizar Resposta da API */}
          {message && (
            <div className="p-3 bg-blue-100 text-blue-800 rounded text-sm mt-4 font-semibold border border-blue-200">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}