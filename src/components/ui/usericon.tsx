import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UserIcon = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  //provavel que mude o link aqui pra button e adicione um onClick
  return (
    <div className="flex justify-end">
      <div className="relative z-10">
        <div
          className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer"
          onClick={toggleOptions}
        >
          <Image src="/circle-user.svg" alt="Usuário" height={32} width={32} />
        </div>

        {showOptions && (
          <div className="text-base absolute bottom-30 transform -translate-x-1/2 bg-white p-2 rounded-md shadow-md z-20">
            <Link
              href="/"
              className="block w-full py-2 px-4 text-left hover:bg-gray-100"
            >
              Mudar usuário
            </Link>
            <Link
              href="/login"
              className="block w-full py-2 px-4 text-left hover:bg-gray-100"
            >
              Log out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserIcon;
