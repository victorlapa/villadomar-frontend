import { useState, useEffect } from "react";
import { Financial } from "@/types/financial"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function Open$Close () {
    
    const [ financials, setFinancials ] = useState<Financial[] | null>();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchFinancial = async () => {
        const data = await fetch (
            "https://villadomarapi.azurewebsites.net/api/Financial/GetFinancial"
        );
        const response = await data.json();
        return response;
    }

    useEffect(() => {
        let ignore = false;
        setFinancials(null); 
        fetchFinancial().then((result) => {
            if(!ignore) {
                setFinancials(result);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);
    if (!financials || financials.length === 0) {
        return <div className="">Carregando...</div>;
    }
    const itemsPerPage = 6;
      
      // Calcular o índice do primeiro e último item na página atual
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      
      const currentItems = financials.slice(indexOfFirstItem, indexOfLastItem);
    
      // Calcular o número total de páginas
      const totalPages = Math.ceil(financials.length / itemsPerPage);
      
      
      // Mudar a página
      const paginate = (pageNumber:number) => setCurrentPage(pageNumber);
      return(
        <div className="container">
            <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
             
            </TableRow>
          </TableHeader>
          <TableBody>

            { currentItems.map((financial) => (
              <TableRow key={financial.id}>
                <TableCell>{financial.openDate}</TableCell>
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