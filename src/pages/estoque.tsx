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
import { ProductResponse } from "@/types/products";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/productType";
import { Field } from "@/types/field";
import EditModal from "@/components/ui/editModal";

export default function Estoque() {
  const [productType, setProductType] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, param: {} });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductResponse | null>(null);

  const openModal = (id?: number) => {
    setIsModalOpen({ isOpen: true, param: { id: id } });
  };

  const closeModal = () => {
    setIsModalOpen({ isOpen: false, param: {} });
  };

  const fetchProducts = async () => {
    const data = await fetch(
      "https://villadomarapi.azurewebsites.net/api/Products/GetProductsWithAmount"
    );
    const response = await data.json();

    return response;
  };

  const fetchProductType = async () => {
    const data = await fetch(
      "https://villadomarapi.azurewebsites.net/api/TypeProduct/GetTypeProducts"
    );
    const response = await data.json();

    return response;
  };

  useEffect(() => {
    let ignore = false;
    setProducts([]);
    fetchProducts().then((result) => {
      if (!ignore) {
        setProducts(result);
      }
    });
    fetchProductType().then((result) => {
      if (!ignore) {
        setProductType(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const fields: Field[] = [
    {
      name: "name",
      type: "text",
      className: "text-red",
      id: "name",
      placeholder: "Nome do produto",
    },
    {
      name: "value",
      type: "number",
      id: "value",
      placeholder: "Valor do produto",
    },
    {
      name: "description",
      type: "text",
      id: "description",
      placeholder: "Descrição do produto",
    },
    {
      name: "weight",
      type: "number",
      id: "weight",
      placeholder: "Peso do produto",
    },
    {
      name: "typeProductID",
      type: "select",
      values: productType,
      id: "typeProduct",
      placeholder: "Tipo do produto",
    },
  ];

  const handleSubmit = async (productId?: number) => {
    var name = document.getElementById("name") as HTMLInputElement;
    var desc = document.getElementById("description") as HTMLInputElement;
    var id = document.getElementById("id") as HTMLInputElement;
    var value = document.getElementById("value") as HTMLInputElement;
    var weight = document.getElementById("weight") as HTMLInputElement;
    var typeProduct = document.getElementById(
      "typeProduct"
    ) as HTMLInputElement;

    const data = {
      name: name.value,
      description: desc.value,
      id: id.value,
      value: value.value,
      weight: weight.value,
      typeProductID: typeProduct.value,
    };
    var url =
      "https://villadomarapi.azurewebsites.net/api/Products/InsertProduct";
    var method = "POST";

    if (id.value !== "") {
      url = `https://villadomarapi.azurewebsites.net/api/Products/EditProduct?id=${productId}`;
      method = "PUT";
    }
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        name.value = "";
        desc.value = "";
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete do produto
  // sera q seria melhor colocar em outros arquivos ou deixar aqui ta suave?
  const handleDelete = async (productId: number) => {
    try {
      // n sei se tem link pra deletar
      const response = await fetch(
        `https://villadomarapi.azurewebsites.net/api/Products/DeleteProduct?id=${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        //se ok o delete ja filtra os novos
        setProducts((prevProducts) =>
          prevProducts?.filter((product) => product.product.id !== productId)
        );
      } else {
        alert("Falaha ao deletar o produto");
      }
    } catch (error) {
      console.error("Ocorrou um erro ao deltar o produto", error);
    }
  };

  const handleEditModal = (product: ProductResponse) => {
    setEditProduct(product);
    setEditModalVisible(!editModalVisible);
  };

  return (
    <Page>
      <Sidebar />
      <div className="w-screen h-screen">
        <StockHeader
          title="Controle de estoque"
          buttonLabel="Adicionar"
          onClick={() => openModal()}
        />
        <Modal
          isOpen={isModalOpen.isOpen}
          onClose={closeModal}
          id={isModalOpen.param}
        >
          <Form fields={fields} onSubmit={() => handleSubmit()} />
        </Modal>
        {editProduct && productType && (
          <EditModal
            isVisible={editModalVisible}
            productTypes={productType}
            editProduct={editProduct}
            onCloseModal={() => setEditModalVisible(false)}
          />
        )}
        <Table>
          <TableCaption>Produtos em estoque</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products === null && (
              <TableRow>
                <TableCell>Carregando...</TableCell>
              </TableRow>
            )}
            {products?.map((product) => (
              <TableRow key={product.product.id}>
                <TableCell>{product.product.name}</TableCell>
                <TableCell>{product.product.description}</TableCell>
                <TableCell>{product.product.value}</TableCell>
                <TableCell>{product.product.weight}</TableCell>
                <TableCell>{product.product.typeProduct}</TableCell>
                <TableCell>
                  {product.product.supplierProduct
                    ? product.product.supplierProduct.name
                    : ""}
                </TableCell>
                <TableCell>{product.totalAmount}</TableCell>
                <TableCell width={200}>
                  <Button
                    onClick={() => handleDelete(product.product.id)}
                    style={{ marginRight: "10px" }}
                  >
                    🗑️
                  </Button>
                  <Button onClick={() => handleEditModal(product)}>📝</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
}
