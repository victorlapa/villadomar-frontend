import React, { useState } from 'react';
import { Button } from './button';

interface Field {
    name: string;
    type: string;
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
        //placehodler pra api
        fetch('/api/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

        onSubmit(formData);
    };

    return (
        <div className="fixed right-0">
            {fields.map((field, index) => (
                <input
                    key={index}
                    type={field.type}
                    placeholder={field.name}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                />
            ))}
            <Button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</Button>
        </div>
    );
};

export default Form;
