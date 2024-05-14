import React, { useState } from 'react'
import { addClothes } from '../api/clothes'

export const CreateProduct = () => {

    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            title,
            price
        }
        try {
            await addClothes(file, payload)
            toast.success('Продукт успешно добавлен')
            setTitle('')
            setPrice('')
            setFile(null)
        } catch (error) {
            toast.error('Ошибка при добавлении продукта')
        }
    }


    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>Создание продукта</h2>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} onSubmit={handleSubmit}>
                <input required onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" placeholder="Название продукта" style={{ marginBottom: "10px" }} />
                <input required onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="price" placeholder="Цена продукта" style={{ marginBottom: "10px" }} />
                <input required onChange={(e) => setFile(e.target.files[0])} type="file" name="image" />
                <button className='button green' type="submit">Создать</button>
            </form>
        </div>
    )
}
