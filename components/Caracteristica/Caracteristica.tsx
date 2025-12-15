import Link from 'next/link';

interface CaracteristicaProps {
  texto: string;
}

export default function Caracteristica({ texto }: CaracteristicaProps) {
  return (
    <Link 
      href={`/caracteristicas/${texto}`}
      className="block p-4 bg-white border rounded-lg hover:border-blue-500 hover:text-blue-600 shadow-sm transition-colors"
    >
      {texto}
    </Link>
  );
}