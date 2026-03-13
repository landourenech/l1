import Image from "next/image";
import { data } from "@/lib/data";
import { columns,  } from "@/components/columns"
import { DataTable } from "@/components/data-table";
export default function Home() {
  return (
<div className="flex h-screen items-center justify-center  bg-white/50 bg-[url('/image.png')] bg-cover ">
 <main className="flex h-full w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start overflow-hidden">
      <Image
        src="/1.gif"
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-[70%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 mb-8 "
      />
      <Image
        src="/2.gif"
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-[10%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 mb-8 rounded-full "
      />
      <Image
        src="/3.gif"
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-[50%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 mb-8 rounded-full "
      />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left text-black">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 text-zinc-950 sm:text-5xl">
            Devoir d'Alogorithmique 
          </h1>
          <p className="max-w-md text-lg leading-8 ">
            Licence 1 Génie Informatique - INPTIC  
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
             {" "}cours du soir
            </a>{" "}
            supervise par{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-red-500"
            >
              Charles MABIALA
            </a>
          </p>
        </div>
       
        <div className="w-full rounded-md border ">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}
