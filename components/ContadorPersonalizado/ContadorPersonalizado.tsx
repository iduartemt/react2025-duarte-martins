"use client";

import { useState, useEffect } from 'react';

interface Props {
  title: string;
}

export default function ContadorPersonalizado({ title }: Props) {
  const [likes, setLikes] = useState(0);
  const chave = `likes-${title}`; // Cria uma chave única por tecnologia

  // 1. Carregar likes guardados ao iniciar
  useEffect(() => {
    const valorSalvo = localStorage.getItem(chave);
    if (valorSalvo) {
      setLikes(Number(valorSalvo));
    }
  }, [chave]);

  // 2. Função para dar like
  const darLike = (e: React.MouseEvent) => {
    e.preventDefault(); // IMPORTANTE: Impede de abrir a página do card ao clicar no like
    
    const novoValor = likes + 1;
    setLikes(novoValor);
    localStorage.setItem(chave, String(novoValor));
  };

  return (
    <button 
      onClick={darLike}
      className="mt-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition"
    >
      👍 {likes}
    </button>
  );
}