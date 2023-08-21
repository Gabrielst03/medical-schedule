'use client'
import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
interface Doctor {
  id: string;
}

import medicos from "../../../db/medicos.json";
import { FormEvent, useState } from "react";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@sweetalert2/theme-borderless/borderless.scss';
import { text } from "stream/consumers";

const Alert = withReactContent(Swal)

export default function Page({ params }: { params: { id: string } }) {

  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('')
  const [day, setDay] = useState('')

  const handleCpfChange = (e: any) => {
    const inputValue = e.target.value;
    
    // Remove caracteres não numéricos do input
    const numericValue = inputValue.replace(/\D/g, '');

    // Aplica a máscara de CPF
    const maskedCpf = numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    setCpf(maskedCpf);
  };

  const [date, setDate] = useState('');

  const handleDateChange = (e: any) => {
    const inputValue = e.target.value;

    // Remove caracteres não numéricos do input
    const numericValue = inputValue.replace(/\D/g, '');

    // Aplica a máscara de data (DD/MM/YYYY)
    const maskedDate = numericValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

    setDate(maskedDate);
  };

  const datee = new Date(day);

  const days = String(datee.getDate()).padStart(2, '0');
  const month = String(datee.getMonth() + 1).padStart(2, '0');
  const year = datee.getFullYear();
  const hours = String(datee.getHours()).padStart(2, '0');
  const minutes = String(datee.getMinutes()).padStart(2, '0');

const formattedDate = `${days}/${month}/${year} às ${hours}:${minutes}`;

  const doctor = medicos
    .filter((item) => item.id === params.id)
    .map((item) => {
      return item.name;
    });

  const avatar = medicos
    .filter((item) => item.id === params.id)
    .map((item) => {
      return item.avatar_url;
    });

    const especialty = medicos
    .filter((item) => item.id === params.id)
    .map((item) => {
      return item.especialty;
    });

    const firstName = name.split(' ')[0]

    function ConfirmSchedule() {

      if(name === "" || cpf === "" || date === "") {
        Alert.fire({
          title: 'Erro',
          text: 'Você precisa preencher todos os dados para realizar o agendamento',
          icon: 'error',
          confirmButtonText: 'Retornar'
        })
        return;
      }

      Alert.fire({
        title: 'Consulta Agendada!',
        html:`<strong>${firstName}</strong>, sua consulta foi agendada com o ${doctor} para o dia ${formattedDate}. <br><br><span style="color: #6366f1">O Médico irá entrar em contato com você para confirmar!</span>`,
        confirmButtonText: 'Obrigado!',
        icon: 'success'
      })
    }

      return (
        <main className="flex flex-col min-h-screen">
          <Header />
    
          <div className="flex flex-col items-center px-5 mt-24">
            <img src={`${avatar}`} alt="" className="w-24 h-24 rounded-lg" />
    
            <p className="text-center text-indigo-500 mt-3">
              Você está prestes a agendar uma nova consulta com{" "}
              <strong className="text-indigo-600">{doctor}</strong>
              
            </p>
            <p className="text-sm text-gray-500">{especialty}</p>
          </div>
    
          <div className="flex flex-col gap-3 px-5 mt-12">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-800">Seu Nome Completo</label>
              <input type="text" placeholder="Ex: João da Silva" value={name} onChange={(e) => setName(e.target.value)} className="w-full outline-none text-sm bg-zinc-100 rounded px-3 py-3"/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-800">Seu CPF</label>
              <input type="text" value={cpf} maxLength={13}
            onChange={handleCpfChange} placeholder="000.000.000-00" className="w-full outline-none text-sm bg-zinc-100 rounded px-3 py-3"/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-800">Data de Nascimento</label>
              <input type="text" value={date} onChange={handleDateChange} placeholder="MM/DD/YYYY" className="w-full outline-none text-sm bg-zinc-100 rounded px-3 py-3"/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-800">Data e Horário</label>
              <input type="datetime-local" value={day} onChange={(e) => setDay(e.target.value)} className="w-full outline-none text-sm bg-zinc-100 rounded px-3 py-3"/>
            </div>
            <button onClick={() => ConfirmSchedule()} className="px-3 mt-5 py-3 rounded bg-indigo-500 text-white">Solicitar Agendamento</button>
          </div>
        </main>
      );

}
