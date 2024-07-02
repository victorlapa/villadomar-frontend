import { Form, Modal, Page, Sidebar, StockHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AllTransactions from "./Components/ allTransactions";
import Open$Close from "./Components/open&close";
import { ProductType } from "@/types/productType";
import { Financial } from "@/types/financial";
import { Field } from "@/types/field";



export default function Financeiro() {
  const [productType, setProductType] = useState<ProductType[]>([]);
  const [showAllTransactions, setAllTransactions] = useState(false);
  const [showOpenAndClose, setOpenAndClose] = useState(false);
  const [showAddFinancial, setAddFinancials] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, param: {} });
  const [financials, setFinancial] = useState<Financial[]>([]);
  
  const openModal = (id?: number) => {
    setIsModalOpen({ isOpen: true, param: { id: id } });
  };
  
  const fields: Field[] = [
    {
      name: "paymentType",
      type: "text",
      className: "text-red",
      id: "paymentType",
      placeholder: "Forma de pagameto",
    },
    {
      name: "value",
      type: "number",
      id: "value",
      placeholder: "Valor",
    },
    {
      name: "date",
      type: "date",
      id: "date",
      placeholder: "Data do Pagamento"
    },
  ];
  
  const handleClick = () => {
    setAllTransactions(true);
    setOpenAndClose(false);
    setAddFinancials(false);
  };

  const OpenAndCloseClick = () => {
    setAllTransactions(false);
    setAddFinancials(false);
    setOpenAndClose(true);
  };

  const AddFinancialClick = () => {
    setAllTransactions(false);
    setOpenAndClose(false);
    setAddFinancials(true);

  };

  const closeModal = () => {
    setIsModalOpen({ isOpen: false, param: {} });
  };

  const handleSubmit = async () => {
    const [paymentType, value, date] = fields.map(
      (field) => {
        return document.getElementById(field.name) as HTMLInputElement;
      }
    );
    const data = {
      date: date.value,
      value: value.value,
      paymentType: paymentType.value,
      moveType: "entrada",
      orderId: 1,
      financialStatus: 7
    };

    console.log(data);

    try {
      const response = await fetch("https://villadomarapi.azurewebsites.net/api/Financial/InsertFinancial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        closeModal();
        const newProduct = await response.json();
        setFinancial((prevProducts) => [...prevProducts, newProduct]);
      } else {
        console.error("Falha ao enviar o formulário");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário: " + error);
    }
  };

  const handleOpen = async () => {

    try {
      const response = await fetch("https://villadomarapi.azurewebsites.net/api/Financial/OpenFinancial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        closeModal();
        const newProduct = await response.json();
        setFinancial((prevProducts) => [...prevProducts, newProduct]);
      } else {
        console.error("Falha ao abrir o caixa");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário: " + error);
    }
  };

  const handleClose = async () => {
    try {
      const response = await fetch("https://villadomarapi.azurewebsites.net/api/Financial/CloseFinancial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        closeModal();
        const newProduct = await response.json();
        setFinancial((prevProducts) => [...prevProducts, newProduct]);
      } else {
        console.error("Falha ao abrir o caixa");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário: " + error);
    }
  };

  return (
    <Page>
      <Sidebar />
      <div className="w-screen h-screen">
      <StockHeader
          title="Controle de estoque"
        />
      <div className="md:container md:mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-around pt-4">
              <Button onClick={OpenAndCloseClick} className="px-10">Abertura/Fechamento</Button>
              <Button onClick={handleClick} className="px-10">Todas as transação</Button>
              <Button onClick={() => openModal()} className="px-10">Adicionar sla</Button>

              <Modal
                isOpen={isModalOpen.isOpen}
                onClose={closeModal}
                id={isModalOpen.param}
              >
                <div className="flex-col">
                  <Button onClick={handleOpen}>Abertura</Button>
                  <Button onClick={handleClose}>Fechamento</Button>
                </div>
                <Form fields={fields} onSubmit={() => handleSubmit()} />
              </Modal>
          </div>
          <div className="md:container pt-14">
            {showAllTransactions && <AllTransactions />}
            {showOpenAndClose && <Open$Close />}
          </div>
        </div>
      </div>
      </div>
    </Page>
  );
}

