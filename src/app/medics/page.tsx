import { Header } from "@/components/Header";
import { Stethoscope, Trophy } from "lucide-react";



import medicos from '../../db/medicos.json'
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header></Header>

      <div className="flex flex-col px-5 min-h-screen mt-24">
        <h1 className="font-semibold text-zinc-600">
          Confira a Lista de Médicos
        </h1>

        <div className="flex flex-col items-center gap-2 mt-6 mb-10">
          {
            medicos.map(item => (
              <Link href={`/schedule/${item.id}`} key={item.id} className="flex gap-2 items-center p-1 w-full rounded-lg shadow bg-white">
              <img
                className="w-24 h-24 bg-contain rounded-lg bg-zinc-200"
                src={item.avatar_url}
                alt="medic"
              />
  
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <p>{item.name}</p>
                  <p className="text-xs text-gray-400">{item.especialty}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="text-amber-500 w-4 h-4" />
                  <p className="text-xs text-amber-500">Avaliação {item.rating}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Stethoscope className="text-teal-500 w-4 h-4" />
                  <p className="text-xs text-teal-500">
                    +{item.consults} consultas realizadas
                  </p>
                </div>
              </div>
            </Link>
            ))
          }
      
        </div>
      </div>
    </main>
  );
}
