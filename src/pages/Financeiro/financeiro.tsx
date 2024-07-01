import { Page, Sidebar } from "@/components";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AllTransactions from "./Components/ allTransactions";
import Open$Close from "./Components/open&close";



export default function Financeiro() {

  const [showAllTransactions, setAllTransactions] = useState(false);
  const [showOpenAndClose, setOpenAndClose] = useState(false);
  
  const handleClick = () => {
    setAllTransactions(true);
    setOpenAndClose(false);
  };

  const OpenAndCloseClick = () => {
    setAllTransactions(false);
    setOpenAndClose(true);
  };

  return (
    <Page>
      <Sidebar />
      <div className="md:container md:mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-around pt-4">
              <Button className="px-10">Abertura/Fechamento</Button>
              <Button onClick={handleClick} className="px-10">Todas as transação</Button>
          </div>
          <div className="md:container pt-14">
            {showAllTransactions && <AllTransactions />}
            {showOpenAndClose && <Open$Close />}
          </div>
        </div>
      </div>
    </Page>
  );
}

