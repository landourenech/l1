import Image from "next/image";
import { data } from "@/lib/data";
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table";

export default function Home() {
  return (
    // min-h-screen au lieu de h-screen pour permettre le défilement si le contenu dépasse
<main className="flex min-h-screen bg-[url('/image.png')] bg-cover ">

    <div className="relative min-h-screen w-full flex items-center justify-center bg-white/50 bg- bg-cover bg-fixed overflow-x-hidden">
      
      {/* GIFs décoratifs - Masqués ou repositionnés sur mobile pour ne pas gêner la lecture */}
      <Image
        src="/1.gif"
        alt="Decoration"
        width={150}
        height={150}
        className="fixed top-[75%] left-[85%] transform -translate-x-1/2 opacity-40 sm:opacity-100 pointer-events-none z-0"
        />
      <Image
        src="/2.gif"
        alt="Decoration"
        width={120}
        height={120}
        className="fixed top-[5%] left-[85%] transform -translate-x-1/2 rounded-full hidden sm:block pointer-events-none z-0"
        />
      <Image
        src="/3.gif"
        alt="Decoration"
        width={100}
        height={100}
        className="fixed top-[40%] left-[5%] transform -translate-x-1/2 rounded-full hidden md:block pointer-events-none z-0"
        />

      <main className="relative z-10 flex h-full w-full max-w-4xl flex-col items-center py-6 px-4 sm:px-6 lg:py-12">
        
        {/* Section En-tête */}
        <div className="flex flex-col items-center gap-4 text-center mb-8 w-full">
          <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-4xl md:text-5xl lg:max-w-2xl">
            Devoir d'Algorithmique 
          </h1>
          
          <div className="flex flex-col items-center gap-1">
            <p className="text-base sm:text-lg text-zinc-800 font-medium">
              Licence 1 Génie Informatique - INPTIC
            </p>
            <p className="text-sm sm:text-base text-zinc-600">
              <span className="bg-zinc-200 px-2 py-0.5 rounded text-zinc-950 text-xs uppercase font-bold mr-2">
                Cours du soir
              </span>
              supervisé par{" "}
              <span className="font-semibold text-red-600">
                Charles MABIALA
              </span>
            </p>
          </div>
        </div>

        {/* Section Tableau - On s'assure qu'il prend toute la place disponible */}
        <div className="w-full bg-transparent">
          <DataTable columns={columns} data={data} />
        </div>

      </main>
    </div>
        </main>
  );
}
