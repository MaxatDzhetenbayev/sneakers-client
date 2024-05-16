import React, { useState } from 'react'
import { addClothes } from '../api/clothes'
import { toast } from 'react-toastify'


const sizes = ['s', 'm', 'l', 'xl', 'xxl']

export const CreateProduct = () => {

    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [options, setOptions] = useState([])
    const [size, setSize] = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            title,
            price,
            options
        }
        try {
            await addClothes(file, payload)
            toast.success('Продукт успешно добавлен')
            setTitle('')
            setPrice('')
            setFile(null)
            setOptions([])

        } catch (error) {
            toast.error('Ошибка при добавлении продукта')
        }
    }

    const handleAddSize = () => {
        if (!size) return toast.error('Выберите размер')
        setOptions([...options, { count: 1, size }])
        setSize('')
    }

    const handleChangeSize = (key, value) => {
        const newOptions = options.map((option) => {
            if (option.size === key) {
                return { ...option, count: value }
            }
            return option
        })
        setOptions(newOptions)
    }

    console.log(options)

    const handleRemoveSize = (key) => {
        const newOptions = options.filter((option) => option.size !== key)
        setOptions(newOptions)
    }
    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>Создание продукта</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input required onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" placeholder="Название продукта" style={{ marginBottom: "10px" }} />
                <input required onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="price" placeholder="Цена продукта" style={{ marginBottom: "10px" }} />
                <input required onChange={(e) => setFile(e.target.files[0])} type="file" name="image" />
                <label>Размеры:</label>
                <select value={size} onChange={e => setSize(e.target.value)}>
                    <option></option>
                    {sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <button onClick={handleAddSize}>Создать размеры</button>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {options.map((option, key) => (
                        <li key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}>
                            <span>Размер {option.size}</span>
                            <input type="number" value={option.count} onChange={(e) => handleChangeSize(option.size, e.target.value)}/>
                            <button onClick={() => handleRemoveSize(option.size)}>Удалить</button>
                        </li>
                    ))}
                </ul>
                <button className='button green' onClick={handleSubmit}>Создать</button>
            </div>
        </div>
    )
}
