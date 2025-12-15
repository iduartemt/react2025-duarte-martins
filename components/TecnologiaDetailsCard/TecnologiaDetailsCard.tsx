import Image from 'next/image';
// Importamos o mesmo contador
import ContadorPersonalizado from '@/components/ContadorPersonalizado/ContadorPersonalizado';

interface TecnologiaDetailsProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiaDetailsCard({ title, image, description, rating }: TecnologiaDetailsProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      
      {/* Cabeçalho com Imagem, Título e LIKE */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={`/tecnologias/${image}`}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        
        {/* Contador em destaque */}
        <div className="scale-125">
           <ContadorPersonalizado title={title} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Descrição</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
        <span className="font-semibold text-blue-800">Avaliação</span>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-xl">{'⭐'.repeat(rating)}</span>
          <span className="text-gray-500">({rating}/5)</span>
        </div>
      </div>
    </div>
  );
}