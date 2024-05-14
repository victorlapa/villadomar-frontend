import React, { useState } from "react";
import { Button } from "./button";

interface Field {
  name: string;
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
    <div className="flex items-center justify-center flex-col">
      {fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          placeholder={field.name}
          value={formData[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className={`border border-gray-300 rounded-md px-2 py-1 m-2 ${field.className}`}
        />
      ))}
      <Button
        onClick={handleSubmit}
        className="bg-sky-950 text-white px-4 py-2 rounded-md"
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
