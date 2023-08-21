import { HeartIcon } from "lucide-react";

export function Header() {
  return(
    <header className="w-full justify-center fixed px-3 h-20 bg-white/50 backdrop-blur-md flex items-center">
    <div className="flex flex-col items-center">
    <HeartIcon className="text-indigo-500 w-10 h-10"/>
    <p className="font-black text-indigo-500">DOC<span className="text-indigo-700">FIND</span></p>
    </div>
</header>
  )
}