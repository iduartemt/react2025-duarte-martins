"use client";

import React, { useState, useEffect } from 'react';

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);
  const [iniciado, setIniciado] = useState(false);

  // 1. Carregar do LocalStorage (apenas ao iniciar)
  useEffect(() => {
    const salvo = localStorage.getItem('contador');
    const histSalvo = localStorage.getItem('historico');
    if (salvo) setValor(Number(salvo));
    if (histSalvo) setHistorico(JSON.parse(histSalvo));
    setIniciado(true);
  }, []);

  // 2. Salvar no LocalStorage (sempre que muda)
  useEffect(() => {
    if (iniciado) {
      localStorage.setItem('contador', valor.toString());
      localStorage.setItem('historico', JSON.stringify(historico));
    }
  }, [valor, historico, iniciado]);

  // Função única para validar e atualizar
  const mudarValor = (novoValor: number) => {
    if (novoValor >= 0 && novoValor <= 10) {
      setValor(novoValor);
      setHistorico([...historico, novoValor]);
    }
  };

  // Lógica de cores simplificada
  const cor = valor <= 3 ? 'text-red-500' : valor <= 7 ? 'text-yellow-500' : 'text-green-500';

  if (!iniciado) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-xl font-bold">Contador</h2>

      {/* Valor com Cor Dinâmica */}
      <div className={`text-8xl font-bold ${cor}`}>
        {valor}
      </div>

      {/* Botões */}
      <div className="flex gap-4">
        <button 
          onClick={() => mudarValor(valor - 1)} 
          disabled={valor === 0}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Decrementar (-)
        </button>
        
        <button 
          onClick={() => mudarValor(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
        
        <button 
          onClick={() => mudarValor(valor + 1)} 
          disabled={valor === 10}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Incrementar (+)
        </button>
      </div>

      {/* Lista de Histórico */}
      <div className="mt-4 w-full max-w-xs">
        <h3 className="font-bold mb-2">Histórico:</h3>
        <ul className="flex flex-wrap gap-2">
          {historico.map((v, i) => (
            <li key={i} className="border px-2 py-1 rounded bg-gray-100">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}