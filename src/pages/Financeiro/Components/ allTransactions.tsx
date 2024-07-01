import { useState, useEffect } from "react";
import { Product } from "@/types/products";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllTransactions() {
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
      return(
        <div className="container">
            <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            { currentItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell></TableCell>
                <TableCell>R$ {product.value},00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          
          <div className="container w-[140px] flex justify-between ">
            {Array.from({length: totalPages}, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1 }
              </button>
            ))}
            </div>
        </div>
      );
    
}