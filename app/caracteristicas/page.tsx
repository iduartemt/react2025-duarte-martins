import Caracteristica from '@/components/Caracteristica/Caracteristica';

export default function CaracteristicasPage() {
  const lista = [
    'JSX e Sintaxe',
    'Componentes React',
    'Virtual DOM',
    'Roteamento Next.js',
    'Hooks do React',
    'Renderização Server-Side',
    'TypeScript',
    'Ecossistema Rico'
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Características
      </h2>
      
      <div className="space-y-3">
        {lista.map((c, i) => (
          <Caracteristica key={i} texto={c} />
        ))}
      </div>
    </div>
  );
}