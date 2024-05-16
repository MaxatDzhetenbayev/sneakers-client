import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Panel = () => {
    return (
        <div className='wrapper clear' style={{padding: "20px"}}>
            <header>
                <ul style={{}}>
                    <li>
                        <Link to="admin">Список продуктов</Link>
                    </li>
                    <li>
                        <Link to="admin/create">Создание продукта</Link>
                    </li>
                </ul>
            </header>
            <Outlet/>
        </div>
    )
}


