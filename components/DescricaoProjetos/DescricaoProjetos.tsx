import Projeto from "../Projeto/Projeto";

export default function DescricaoProjetos() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-black">Meus Projetos</h3>
      
      <p className="mb-6 text-black">
        Ao longo da minha jornada de desenvolvimento, criei vários projetos interessantes 
        que demonstram minhas habilidades em diferentes tecnologias web. 
        Você pode explorar todos os meus projetos na minha{" "}
        <a 
          href="https://iduartemt.github.io/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-semibold"
        >
          homepage do GitHub Pages
        </a>.
      </p>

      <div className="mt-6 text-black">
        <h4 className="text-lg font-medium mb-3 ">Projetos em Destaque:</h4>
        
        <Projeto 
          nome="Loja Online"
          url="https://iduartemt.github.io/Lab7/index.html"
        />
        
        <Projeto 
          nome="Site com JavaScript Interativo"
          url="https://iduartemt.github.io/Lab5/index.html"
        />
        
        <Projeto 
          nome="A minha cidade"
          url="https://iduartemt.github.io/Lab3/index.html"
        />
      </div>
    </div>
  );
}
