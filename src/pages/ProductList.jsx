import React, { useEffect, useState } from 'react'
import { deleteClothes, getAllClothes } from '../api/clothes'
import { toast } from 'react-toastify'
import emailjs from "@emailjs/browser";

export const ProductList = () => {

    const [clothes, setClothes] = useState([])

    useEffect(() => {
        const unsubscribe = getAllClothes(setClothes);
        return () => unsubscribe();
    }, [])

    const handleDeleteProduct = async (id) => {
        try {
            await deleteClothes(id)
            toast.success('Продукт успешно удален')
        } catch (error) {
            toast.error('Ошибка при удалении продукта')
        }
    }


    const handleSendEmail = () => {

        const option = {
            email: "delta.education.imas@gmail.com",
            products: [{ title: 'Шуба', count: 1 }],
            orderId: '123123125124',
        }

        emailjs
            .send('service_j3kkoql', 'template_d6iil4i', option, 'myx63XfRfUvzWa19x',)
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );
    }

    return (
        <div>
            <button onClick={handleSendEmail}>Отправить письмо</button>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Список продуктов</h2>

            <ul style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '20px',
                marginTop: '20px'
            }}>
                {clothes.map((item) => (
                    <li key={item.id} style={{
                        display: 'grid',
                        gridTemplateRows: '50px 200px 125px',
                        maxWidth: '200px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}>
                        <header style={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}>
                            <button onClick={() => handleDeleteProduct(item.id)} className='button button__red'>Удалить</button>
                        </header>
                        <img style={{ width: "100%" }} src={item.imageurl} alt={item.title} />
                        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", paddingTop: "20px" }}>
                            <h3>{item.title}</h3>
                            <p>{item.price}тг.</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
