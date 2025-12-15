"use client";

import React, { useState } from 'react';

export default function InputPage() {
  // --- 1. Estado do Espelho de Texto ---
  const [texto, setTexto] = useState('');

  // --- 2. Estado do Seletor ---
  const [tecnologia, setTecnologia] = useState('');
  const opcoes = ['React', 'Next.js', 'TypeScript', 'Tailwind'];

  // --- 3. Estado da Lista de Tarefas ---
  const [tarefas, setTarefas] = useState<{ id: number; text: string }[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  
  // Estado para Edição
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEdit, setTextoEdit] = useState('');

  // Adicionar
  const adicionar = () => {
    if (!novaTarefa.trim()) return;
    setTarefas([...tarefas, { id: Date.now(), text: novaTarefa }]);
    setNovaTarefa('');
  };

  // Apagar
  const apagar = (id: number) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  // Iniciar Edição
  const iniciarEdicao = (id: number, textoAtual: string) => {
    setEditandoId(id);
    setTextoEdit(textoAtual);
  };

  // Salvar Edição
  const salvarEdicao = () => {
    setTarefas(tarefas.map((t) => (t.id === editandoId ? { ...t, text: textoEdit } : t)));
    setEditandoId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Página de Inputs</h1>

      {/* 1. Espelho de Texto */}
      <section className="p-4 border rounded shadow-sm">
        <h2 className="font-bold mb-2">Espelho</h2>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite algo..."
          className="border p-2 rounded w-full mb-2"
        />
        <p className="bg-gray-100 p-2 rounded">Resultado: {texto}</p>
      </section>

      {/* 2. Seletor */}
      <section className="p-4 border rounded shadow-sm">
        <h2 className="font-bold mb-2">Seletor</h2>
        <select
          value={tecnologia}
          onChange={(e) => setTecnologia(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>Escolha uma tecnologia</option>
          {opcoes.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
        {tecnologia && <p className="mt-2 text-blue-600">Selecionado: {tecnologia}</p>}
      </section>

      {/* 3. Lista de Tarefas */}
      <section className="p-4 border rounded shadow-sm">
        <h2 className="font-bold mb-2">Tarefas</h2>
        
        <div className="flex gap-2 mb-4">
          <input
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Nova tarefa..."
            className="border p-2 rounded flex-1"
          />
          <button onClick={adicionar} className="bg-green-500 text-white px-4 rounded">
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tarefas.map((t) => (
            <li key={t.id} className="flex gap-2 items-center justify-between border-b pb-2">
              {editandoId === t.id ? (
                // Modo Edição
                <>
                  <input
                    value={textoEdit}
                    onChange={(e) => setTextoEdit(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                  <button onClick={salvarEdicao} className="text-green-600 text-sm">Salvar</button>
                  <button onClick={() => setEditandoId(null)} className="text-gray-500 text-sm">Cancelar</button>
                </>
              ) : (
                // Modo Visualização
                <>
                  <span>{t.text}</span>
                  <div className="space-x-2">
                    <button onClick={() => iniciarEdicao(t.id, t.text)} className="text-blue-500 text-sm">
                      Editar
                    </button>
                    <button onClick={() => apagar(t.id)} className="text-red-500 text-sm">
                      Apagar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}