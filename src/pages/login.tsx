import { Spacer } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    document.cookie = "auth=true;";
    router.replace("/");
  };

  return (
    <div className="bg-gradient-to-bl from-amber-400 to-sky-950 w-screen h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white flex flex-col p-10 max-w-3xl w-full">
        <div>
          <Image
            src="/logo.webp"
            alt="Logo"
            height={128}
            width={128}
            className="mx-auto rounded-full"
          />
        </div>
        <form onSubmit={handleLogin}>
          <Spacer size={40} />
          <Input placeholder="E-mail" type="email" />
          <Spacer size={8} />
          <Input placeholder="Senha" type="password" />
          <Spacer size={24} />
          <Button className="w-full bg-slate-800 hover:bg-slate-900">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
