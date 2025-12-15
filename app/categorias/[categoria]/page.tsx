import Link from 'next/link';
import Image from 'next/image';
import { produtos } from '@/listas/dados';

interface Props {
  params: Promise<{ categoria: string }>;
}

export default async function CategoriaPage({ params }: Props) {
  const resolvedParams = await params;
  const categoriaNome = decodeURIComponent(resolvedParams.categoria);
  
  // Filtro simples
  const listaFiltrada = produtos.filter(p => p.categoria === categoriaNome);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">
        Categoria: {categoriaNome}
      </h1>
      <div className="text-center mb-8">
        <Link href="/categorias" className="text-gray-500 hover:underline">← Escolher outra categoria</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listaFiltrada.length > 0 ? (
          listaFiltrada.map((produto) => (
            <Link key={produto.id} href={`/produto/${produto.id}`}>
              <div className="border p-4 rounded-xl bg-white hover:shadow-lg transition">
                <div className="relative w-full h-32 mb-2">
                   <Image src={produto.imagem} alt={produto.nome} fill className="object-contain" />
                </div>
                <h2 className="font-bold">{produto.nome}</h2>
                <p>{produto.preco}€</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
}