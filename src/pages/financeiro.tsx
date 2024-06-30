import { BaseChartCard, Page, Sidebar } from "@/components";
import { Product } from "@/types/products";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { totalmem } from "os";


export default function Financeiro() {

  const [products, setProducts ] = useState<Product[] | null>();
  const [currentPage, setCurrentPage] = useState(1);

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
  if (!products || products.length === 0) {
    return <div>Carregando...</div>;
  }
  const itemsPerPage = 6;
  
  // Calcular o índice do primeiro e último item na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  
  // Mudar a página
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);



  return (
    <Page>
      <Sidebar />
      <div className="md:container md:mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-center space-x-20 w-full h-1/4 pt-10">
            <div className="box border-2 border-black rounded-md w-1/6 h-1/2">
              <div className="content-center text-center w-full h-full">
                <div className="font-bold text-2xl">Status</div>
                <div className="font-bold text-base">Aberto</div>
              </div>
            </div>
            <div className="box border-2 border-black rounded-md w-1/6 h-1/2">
              <div className="content-center text-center w-full h-full">
                <div className="font-bold text-2xl">Entrada</div>
                <div className="font-bold text-base text-green-600">R$0,00</div>
              </div>
            </div>
            <div className="box border-2 border-black rounded-md w-1/6 h-1/2">
              <div className="content-center text-center w-full h-full">
                <div className="font-bold text-2xl">Saida</div>
                <div className="font-bold text-base text-red-600">R$0,00</div>
              </div>
            </div>
          </div>
          <div className="md:container pt-14">
          <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Forma de pagamento</TableHead>
              <TableHead>Operação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            { currentItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </div>
          <div className="container w-[140px] flex justify-between ">
            {Array.from({length: totalPages}, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1 }
              </button>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

