"use client";

import { useState, useEffect } from 'react';

export default function Relogio() {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const atualizar = () => setHora(new Date().toLocaleTimeString('pt-PT'));
    
    atualizar(); // Atualiza logo ao montar
    const timer = setInterval(atualizar, 1000); // Atualiza a cada segundo

    return () => clearInterval(timer); // Limpeza ao desmontar
  }, []);

  // Se não houver hora (renderização no servidor), não mostra nada
  if (!hora) return null;

  return (
    <div className="font-mono text-xl font-bold bg-gray-100 p-2 rounded inline-block">
      {hora}
    </div>
  );
}