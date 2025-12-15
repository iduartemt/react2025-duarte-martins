import Link from 'next/link';
import { categorias } from '@/listas/dados';

export default function CategoriasPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-8">Categorias</h1>
      
      <div className="flex flex-wrap justify-center gap-8">
        {categorias.map((cat, index) => (
          <Link key={index} href={`/categorias/${cat.nome}`}>
            <div className="w-40 h-40 bg-white border-2 border-blue-100 rounded-full flex flex-col items-center justify-center hover:scale-110 hover:border-blue-500 transition cursor-pointer shadow-md">
              <span className="font-bold text-gray-700">{cat.nome}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}