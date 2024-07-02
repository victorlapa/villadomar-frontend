import { Form, Modal, Page, Sidebar, StockHeader } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Waste } from "@/types/waste";
import { useEffect, useState } from "react";

export default function Descarte() {
  const [wastes, setWastes] = useState<Waste[] | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchWastes = async () => {
    const data = await fetch(
      "https://villadomarapi.azurewebsites.net/api/Waste/GetWastes"
    );
    const response = await data.json();

    return response;
  };

  useEffect(() => {
    let ignore = false;
    setWastes(null);
    fetchWastes().then((result) => {
      if (!ignore) {
        setWastes(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const fields = [
    { name: "name", type: "text", placeholder: 'Nome do item' },
    { name: "description", type: "text", placeholder: 'Descrição' },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    console.log(formData);
  };

  const handleDelete = async (wasteId: number) => {
    try {
      const response = await fetch(`https://villadomarapi.azurewebsites.net/api/Waste/DeleteWaste?id=${wasteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setWastes((prevWastes) => prevWastes?.filter((waste) => waste.id !== wasteId));
      } else {
        alert('Falha ao deletar o item');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao deletar o item', error);
    }
  };

  const handleEdit = () => {
    openModal();
  };

  return (
    <Page>
      <Sidebar />
      <div className="w-screen h-screen">
        <StockHeader
          title="Controle de descarte"
          buttonLabel="Adicionar"
          onClick={openModal}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Form fields={fields} onSubmit={handleSubmit} />
        </Modal>
        <Table>
          <TableCaption>Itens descartados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wastes === null && (
              <TableRow>
                <TableCell>Carregando...</TableCell>
              </TableRow>
            )}
            {wastes?.map((waste) => (
              <TableRow key={waste.id}>
                <TableCell>{waste.name}</TableCell>
                <TableCell>{waste.description}</TableCell>
                <TableCell width={200}>
                  <Button onClick={() => handleDelete(waste.id)} style={{ marginRight: '10px' }}>Delete</Button>
                  <Button onClick={handleEdit}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
}
