import React from 'react'
import ListButton from './ListButton';
function Area({ name,button,children }) {

    return (
        <div className='moryson_area'>
            <div className='moryson_area_top'>
                <h1 className='moryson_area_title'>{name}</h1>
                <div className='moryson_separ'></div>
                <ListButton button={button} />
            </div>
            <div className='moryson_area_index'>
                {children}
            </div>
        </div>
    )
}

export default Area