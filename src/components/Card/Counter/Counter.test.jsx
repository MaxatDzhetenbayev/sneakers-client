import React, {useState} from "react";
import { Counter } from "./Counter";
import {render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';


const TestCounterComponent = () => {
    const [count, setCount] = useState(0)

    const handleAdd = () => {
        setCount(prev => prev + 1)
    }

    const handleRemove = () => {
        if (count === 0) return
        setCount(prev => prev - 1)
    }

    return <Counter count={count} onAdd={handleAdd} onRemove={handleRemove} />
}


test('Рендер компоненты с инициализированным значением', () => {
    const {getByText} = render(<TestCounterComponent />)
    expect(getByText('0')).toBeInTheDocument()
})

test('Проверка увеличения счетчика', () => {
    const {getByText} = render(<TestCounterComponent />)
    fireEvent.click(getByText('+'))
    expect(getByText('1')).toBeInTheDocument()
})

test('Проверка уменьшения счетчика', () => {
    const {getByText} = render(<TestCounterComponent />)
    fireEvent.click(getByText('-'))
    expect(getByText('0')).toBeInTheDocument()
})