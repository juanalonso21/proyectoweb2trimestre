import React, { useState } from "react";
import styled from 'styled-components';

const Contact = () => {
    const [name, setName] = useState('');
    const [asunto, setAsunto] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('btn btn-primary');
    const [formulario, setFormulario] = useState('d-block');
    const [thanks, setThanks] = useState('d-none');
    const [boton, setBoton] = useState('d-block');
    const [label, setLabel] = useState('SEND');

    const send = () => {
        if (description && asunto && name) {
            const contenido = {
                "content": "Me interesa:",
                "embeds": [
                    {
                        "title": asunto,
                        "description": description,
                        "footer": {
                            "text": "De: " + name
                        }
                    }
                ]
            };

            fetch('https://discord.com/api/webhooks/1349896265223114773/nCVe-sGiKvg3WBs-DLDIn-rhE6Tk_q32R04S9AS5Pc__JWlEYQ84j8xesht2gRQ-Eh79', {
                method: 'POST',
                body: JSON.stringify(contenido),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setDescription('');
                setAsunto('');
                setName('');
                setFormulario('d-none');
                setThanks('d-block');
                setBoton('d-none');
            })
        } else {
            setColor('btn btn-danger');
            setLabel('Error, try again');
        }
    };

    return (
        <div className="container bg-primary text-white p-5 rounded">
            <div className="text-center mb-4">
                <h2>CONTACTA CON NOSOTROS</h2>
            </div>
            <div className={formulario}>
                <div className="mb-3">
                    <label className='form-label'>Nombre</label>
                    <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Exa. Himilce Sanchez' className='form-control' />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Asunto</label>
                    <input value={asunto} onChange={e => setAsunto(e.target.value)} type='text' placeholder='Exa. Reparación' className='form-control' />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Descripción</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Escríbenos lo que necesites' className='form-control' rows='3'></textarea>
                </div>
            </div>
            <div className={thanks}>
                <h3 className='text-center'>GRACIAS POR CONTACTARNOS</h3>
            </div>
            <div className={boton + " text-center mt-3"}>
                <Boton onClick={send} className={color}>{label}</Boton>
            </div>
        </div>
    );
};

export default Contact;

const Boton = styled.button`
    padding: 10px;
    height: 40px;
    width: 150px;
    border-radius: 50px;
`;