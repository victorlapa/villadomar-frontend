import { Form, Modal, Page, Sidebar, StockHeader } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";

export default function Estoque() {
  const [products, setProducts] = useState<Product[] | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchProducts = async () => {
    const data = await fetch(
      "https://villadomarapi.azurewebsites.net/api/Products/GetProducts"
    );
    const response = await data.json();

    return response;
  };

  useEffect(() => {
    let ignore = false;
    setProducts(null);
    fetchProducts().then((result) => {
      if (!ignore) {
        setProducts(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const fields = [
    { name: "name", type: "text" },
    { name: "description", type: "text" },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    console.log(formData);
  };

  return (
    <Page>
      <Sidebar />
      <div className="w-screen h-screen">
        <StockHeader
          title="Controle de estoque"
          buttonLabel="Adicionar"
          onClick={openModal}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Form fields={fields} onSubmit={handleSubmit} />
        </Modal>
        <Table>
          <TableCaption>Produtos em estoque</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products === null && (
              <TableRow>
                <TableCell>Carregando...</TableCell>
              </TableRow>
            )}
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
}
