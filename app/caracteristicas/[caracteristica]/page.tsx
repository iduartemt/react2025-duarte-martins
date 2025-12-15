import Link from 'next/link';

interface PageProps {
  params: Promise<{ caracteristica: string }>;
}

export default async function DetalhePage({ params }: PageProps) {
  // 1. Recebemos o parametro do URL (ex: "JSX%20e%20Sintaxe")
  const { caracteristica } = await params;
  
  // 2. Descodificamos para texto legível (ex: "JSX e Sintaxe")
  const texto = decodeURIComponent(caracteristica);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-10 text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {texto}
        </h1>

        <Link 
          href="/caracteristicas"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          ← Voltar
        </Link>
      </div>

    </div>
  );
}