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
    { name: "name", type: "text", placeholder: 'Nome do produto' },
    { name: "description", type: "text", placeholder: 'Descrição' },
    //{ name: "Preço", type: "number" }, Depene do stake holder aqui
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    console.log(formData);
  };

  // Delete do produto 
  // sera q seria melhor colocar em outros arquivos ou deixar aqui ta suave?
  const handleDelete = async (productId: number) => {
    try {
      // n sei se tem link pra deletar 
      const response = await fetch(`linkapi/delete/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        //se ok o delete ja filtra os novos
        setProducts((prevProducts) => prevProducts?.filter((product) => product.id !== productId));
      } else {
        alert('Falaha ao deletar o produto');
      }
    } catch (error) {
      console.error('Ocorrou um erro ao deltar o produto', error);
    }
  };

  // sera q daria pra fazer com que todo edit fosse modularizado, ou to viajando?
  // na vdd o editar seria melhor arbri uma tela nova e la rodar essa funcao 
  // ou ent editar direto na tabela, mas n sei o quao dificil isso é 
  const handleEdit = async (productId: number) => {
    try {
      // n sei se tem link pra editar 
      const response = await fetch(`linkapi/edit/${productId}`, {
        method: 'UPDATE',
      });
      if (response.ok) {
        // n sei o q fazeria 
      } else {
        alert('Falaha ao editar o produto');
      }
    } catch (error) {
      console.error('Ocorrou um erro ao editar o produto', error);
    }
  };
  

  // tem q ver se dar pra mudar o tamanho da celular de acoes 
  // ia ser legal botar um botao de lixeira e de um lapis 
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
              <TableHead>Ações</TableHead>
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
                <TableCell width={200}>
                  <Button onClick={() => handleDelete(product.id)} style={{ marginRight: '10px' }}>Delete</Button>
                  <Button onClick={() => handleEdit(product.id)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
}
