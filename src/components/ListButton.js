import React from 'react'

function ListButton({ button }) {
    return (
        <div className='hostel_button_container'>
            {button.map((button) => (
                <button style={{ background: button.color }} className='hostel_button_list'>{button.content}</button>
            ))}
        </div>
    )
}

export default ListButton