import React, { useState } from "react";
import { Button } from "./button";

interface Field {
  name: string;
  placeholder: string;
  type: string;
  className?: string; // Add className property
}

interface FormProps {
  fields: Field[];
  onSubmit: (formData: Record<string, string>) => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    //lidar com o input
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    fetch(
      "https://villadomarapi.azurewebsites.net/api/Products/InsertProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center w-1/2 h-3/4 flex-col rounded-3xl bg-gray-100 shadow-xl">
      {fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className={`border border-gray-300 rounded-md px-2 py-1 m-2 ${field.className}`}
        />
      ))}
      <Button
        onClick={handleSubmit}
        className="bg-sky-950 text-white px-4 py-2 rounded-md w-2/5"
      >
        Submit
      </Button>
    </div>
  );
};

export default Form;

//  const fields = [
//    { name: 'Name', type: 'text', className: 'adc mais coisa no css' },
//    { name: 'Email', type: 'email' },
//     { name: 'Password', type: 'password' },
//  ];
