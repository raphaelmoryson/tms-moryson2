import React from 'react'

function ListButton({ button }) {
    return (
        <div className='moryson_button_container'>
            {button.map((button, index) => (
                <button key={index} style={{ background: button.color }} className='moryson_button_list' onClick={button.action}>{button.content}</button>
            ))}
        </div>
    )
}

export default ListButton