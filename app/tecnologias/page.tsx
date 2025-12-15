import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard'; // Verifique se o caminho está correto
import tecnologiasData from '@/app/data/tecnologias.json';

export default function TecnologiasPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Tecnologias Exploradas
      </h2>
      
      {/* Container flexível para os cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {tecnologiasData.map((tec, i) => (
          <TecnologiaCard 
            key={i}
            index={i}
            title={tec.title}
            image={tec.image}
          />
        ))}
      </div>
    </div>
  );
}