import Image from 'next/image';
import Link from 'next/link';
// Importamos o nosso contador
import ContadorPersonalizado from '@/components/ContadorPersonalizado/ContadorPersonalizado';

interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard({ title, image, index }: TecnologiaCardProps) {
  return (
    <Link href={`/tecnologia/${index}`}>
      <div className="w-48 h-64 bg-white rounded-xl shadow-md p-4 m-4 flex flex-col items-center justify-center gap-2 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
        <div className="relative w-16 h-16">
          <Image
            src={`/tecnologias/${image}`}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 text-center">
          {title}
        </h3>

        {/* Inserimos o contador aqui */}
        <ContadorPersonalizado title={title} />
        
      </div>
    </Link>
  );
}