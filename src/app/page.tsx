"use client";
import { Header } from "@/components/Header";
import { Loader2, SearchIcon, SearchSlash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const Redirect = (url: string) => {
    setLoading(true)
    setTimeout(() => {
      window.location.replace(url)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header></Header>


      {/* Hero */}
      <div className="flex flex-col items-center justify-between px-5 mt-44">
        <div className="flex flex-col">
          <p className="w-36 font-medium text-sm px-2 py-1 rounded-full bg-indigo-200 text-indigo-500">
            Saúde em 1° Lugar
          </p>
          <p className="text-2xl text-zinc-700 font-bold mt-2">
            Encontre seu médico e{" "}
            <span className="text-indigo-500">agende</span> a sua consulta.
          </p>
        </div>
        <Image src="/illus.png" alt="illustration" width={250} height={250} />
      </div>

      {/* CTA */}
      <div className="flex flex-col px-5 mt-10">
        {loading ? (
          <a
            href=""
            className="flex items-center opacity-50 justify-center gap-2 p-3 font-medium rounded-full bg-indigo-500 text-zinc-100"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </a>
        ) : (
          <button
            onClick={() => Redirect('/medics')}
            className="flex items-center justify-center gap-2 p-3 font-medium rounded-full bg-indigo-500 text-zinc-100 hover:bg-indigo-600"
          >
            <SearchIcon className="w-5 h-5" />
            Buscar Médicos
          </button>
        )}
      </div>
    </main>
  );
}
