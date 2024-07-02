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
import {  Order } from "@/types/pedido"; // Certifique-se de criar este tipo
import { useEffect, useState } from "react";

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[] | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchOrders = async () => {
    const data = await fetch(
      "https://villadomarapi.azurewebsites.net/api/Orders/GetOrders"
    );
    const response = await data.json();

    return response;
  };

  useEffect(() => {
    let ignore = false;
    setOrders(null);
    fetchOrders().then((result) => {
      if (!ignore) {
        setOrders(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const fields = [
    { name: "customerName", type: "text", placeholder: 'Nome do cliente' },
    { name: "orderDescription", type: "text", placeholder: 'Descrição do pedido' },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    console.log(formData);
  };

  const handleDelete = async (orderId: number) => {
    try {
      const response = await fetch(`https://villadomarapi.azurewebsites.net/api/Orders/DeleteOrder?id=${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders((prevOrders) => prevOrders?.filter((order) => order.id !== orderId));
      } else {
        alert('Falha ao deletar o pedido');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao deletar o pedido', error);
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
          title="Controle de pedidos"
          buttonLabel="Adicionar"
          onClick={openModal}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Form fields={fields} onSubmit={handleSubmit} />
        </Modal>
        <Table>
          <TableCaption>Pedidos realizados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Cliente</TableHead>
              <TableHead>Descrição do Pedido</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders === null && (
              <TableRow>
                <TableCell>Carregando...</TableCell>
              </TableRow>
            )}
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderDescription}</TableCell>
                <TableCell width={200}>
                  <Button onClick={() => handleDelete(order.id)} style={{ marginRight: '10px' }}>Delete</Button>
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
