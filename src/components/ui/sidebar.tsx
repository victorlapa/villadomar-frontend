import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-[140px] bg-sky-950 justify-start items-center p-4">
      <Link href="/">
        <Image src="/logo.webp" alt="Logo" height={64} width={64} />
      </Link>
      <div className="flex flex-col gap-6 items-center mt-5">
        <Link href="/estoque">
          <Image
            src="/stock.svg"
            alt="Estoque"
            height={32}
            width={32}
            className="mx-auto"
          />
          <span className="text-white">Estoque</span>
        </Link>
        <Link href="/Financeiro/financeiro">
          <Image
            src="/coins.svg"
            alt="Logo"
            height={32}
            width={32}
            className="mx-auto"
          />
          <span className="text-white">Financeiro</span>
        </Link>
        <Link href="/">
          <Image
            src="/phone-call.svg"
            alt="Logo"
            height={32}
            width={32}
            className="mx-auto"
          />
          <span className="text-white">Pedidos</span>
        </Link>
        <Link href="/">
          <Image
            src="/cross.svg"
            alt="Logo"
            height={32}
            width={32}
            className="mx-auto"
          />
          <span className="text-white">Descarte</span>
        </Link>
      </div>
      <div className="mt-auto flex flex-col justify-center items-center">
        <Link href="/">
          <Image
            src="/settings.svg"
            alt="Configurações"
            height={32}
            width={32}
            className="mt-auto mx-auto"
          />
          <span className="text-white">Configurações</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
