import { ProductType } from "@/types/productType";
import { Product, ProductResponse } from "@/types/products";
import { useEffect, useState } from "react";

interface Props {
  isVisible: boolean;
  editProduct: ProductResponse;
  productTypes: ProductType[];
  onCloseModal: () => void;
}

const EditModal = ({
  isVisible,
  editProduct,
  onCloseModal,
  productTypes,
}: Props) => {
  const [name, setName] = useState(editProduct.product.name);
  const [description, setDescription] = useState(
    editProduct.product.description
  );
  const [value, setValue] = useState(editProduct.product.value);
  const [weight, setWeight] = useState(editProduct.product.weight);
  const [typeProduct, setTypeProduct] = useState(
    editProduct.product.typeProduct
  );

  useEffect(() => {
    setName(editProduct.product.name);
    setDescription(editProduct.product.description);
    setValue(editProduct.product.value);
    setWeight(editProduct.product.weight);
    setTypeProduct(editProduct.product.typeProduct);
  }, [editProduct]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://villadomarapi.azurewebsites.net/api/Products/EditProduct`,
        {
          body: JSON.stringify({
            description: description,
            // adicionar outros campos
          } as Product),
        }
      );

      if (response) {
        onCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    isVisible && (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"></div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Editar produto
                    </h3>
                    {editProduct && (
                      <div className="mt-2 flex flex-col gap-2 items-center justify-center">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nome"
                        />
                        <input
                          placeholder="Descrição"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                          placeholder="Valor"
                          type="number"
                          value={value}
                          onChange={(e) => setValue(parseInt(e.target.value))}
                        />
                        <input
                          placeholder="Peso"
                          type="number"
                          value={weight}
                          onChange={(e) => {
                            setWeight(parseInt(e.target.value));
                          }}
                        />
                        <select
                          value={typeProduct}
                          onChange={(e) => setTypeProduct(e.target.value)}
                        >
                          {productTypes.map((type) => {
                            return <option value={type.id}>{type.name}</option>;
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
