import React from 'react'

export const Footer = () => {
    return (
        <footer style={{ display: "flex", flexDirection: "column", backgroundColor: "#333", color: "#fff" }}>
            <div style={{ padding: "10px 20px"}}>
                <h4>Контакты:</h4>
                <ul>
                    <li><span>Место:</span> г.Семей, ул.Засядко 54</li>
                    <li><span>Телефон:</span> <a href="tel:+77719872005"> 8(771) 987-20-05</a></li>
                </ul>
                <div></div>
            </div>
            <hr />
            <div style={{ padding: "10px 20px"}}>
                © 2024 Все права защищены
            </div>
        </footer>
    )
}
