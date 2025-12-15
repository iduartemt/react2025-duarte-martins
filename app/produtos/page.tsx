import Link from 'next/link';
import Image from 'next/image'; // Certifica-te que tens as imagens na pasta public
import { produtos } from '@/listas/dados';

export default function ProdutosPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Produtos DEISIshop</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <Link key={produto.id} href={`/produto/${produto.id}`}>
            <div className="border p-4 rounded-xl shadow cursor-pointer bg-white hover:bg-gray-50">
              <div className="relative w-full h-40 mb-4 bg-gray-200 rounded">
                {/* Substitui o src por imagens reais da tua pasta public */}
                <Image src={produto.imagem} alt={produto.nome} fill className="object-contain" />
              </div>
              <h2 className="font-bold text-lg">{produto.nome}</h2>
              <p className="text-blue-600 font-bold">{produto.preco}€</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}