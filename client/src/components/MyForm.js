import React from 'react';
import FormComp from './FormComp';

import './App.css';


const MyForm = () => {

    let template = {
        title: "Time Form",
        fields: [
            {
                title: 'Name ',
                type: 'text', 
                name: 'name',
                icon: 'user icon',
                placeholder: 'John Smith'
            },
            {
                title: 'Source ',
                type: 'text', 
                name: 'source',
                icon: 'flag icon',
                placeholder: '12.927880, 77.627600'
            },
            {
                title: 'Destination ',
                type: 'text', 
                name: 'destination',
                icon: 'flag checkered icon',
                placeholder: '13.035542, 77.597100'
            },
            {
                title: 'Time ',
                type: 'datetime-local', 
                name: 'time',
                icon: 'clock icon',
                placeholder: '8:00 PM'
            },
            {
                title: 'Email ',
                type: 'email', 
                name: 'email',
                icon: 'envelope open icon',
                placeholder: 'john@email.com'
            }

        ]
    }
    
    return (
        <FormComp
            template={template}
        />
    );
};

export default MyForm;
