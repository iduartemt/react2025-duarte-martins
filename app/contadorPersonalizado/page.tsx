"use client";

import { useState, useEffect } from 'react';

interface Props {
  title: string; // O nome da tecnologia (ex: "React")
}

export default function ContadorPersonalizadoPage({ title }: Props) {
  const [likes, setLikes] = useState(0);
  const chaveDoStorage = `likes-${title}`; // Cria uma chave única: "likes-React"

  // 1. Carregar valor ao iniciar
  useEffect(() => {
    const valorSalvo = localStorage.getItem(chaveDoStorage);
    if (valorSalvo) {
      setLikes(Number(valorSalvo));
    }
  }, [chaveDoStorage]);

  // 2. Função de adicionar Like
  const adicionarLike = (e: React.MouseEvent) => {
    // Importante: Impede que o clique no botão abra o Link da página (se estiver dentro de um)
    e.preventDefault(); 
    
    const novoValor = likes + 1;
    setLikes(novoValor);
    localStorage.setItem(chaveDoStorage, String(novoValor));
  };

  return (
    <button 
      onClick={adicionarLike}
      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold hover:bg-blue-200 transition"
    >
      👍 {likes}
    </button>
  );
}