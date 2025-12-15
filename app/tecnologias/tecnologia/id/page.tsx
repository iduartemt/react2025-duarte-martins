import Link from 'next/link';
import tecnologiasData from '@/app/data/tecnologias.json';
import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard/TecnologiaDetailsCard';

export default function TecnologiaPage({ params }: { params: { id: string } }) {
  // Converter o ID da URL para número
  const index = parseInt(params.id);
  const tecnologia = tecnologiasData[index];

  // Se o ID não existir (ex: /tecnologia/999), mostra erro simples
  if (!tecnologia) {
    return <div className="p-8 text-center text-red-500">Tecnologia não encontrada.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Botão Voltar */}
      <div className="max-w-2xl mx-auto mb-6">
        <Link 
          href="/tecnologias"
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
        >
          ← Voltar à lista
        </Link>
      </div>

      {/* Card de Detalhes */}
      <TecnologiaDetailsCard 
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />
    </div>
  );
}