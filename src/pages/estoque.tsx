import { Page, Sidebar, StockHeader } from "@/components";
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

  return (
    <Page>
      <Sidebar />
      <div className="w-screen h-screen">
        <StockHeader
          title="Controle de estoque"
          buttonLabel="Adicionar"
          onClick={() => console.log("testes")}
        />
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
