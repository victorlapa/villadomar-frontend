import React from 'react'
import { Button } from './button';

interface FormProps {
    fields: string[];
    onSubmit: () => void;
}

const form: React.FC<FormProps> = ({ fields, onSubmit }) => {
    return (
        <div style={{ position: 'fixed', right: 0 }}>
            {fields.map((field, index) => (
                <input key={index} type="text" placeholder={field} />
            ))}
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    );
};

export default form;


