import React from 'react'
import ListButton from './ListButton';
function Area({ name,button,children }) {

    return (
        <div className='hostel_area'>
            <div className='hostel_area_top'>
                <h1 className='hostel_area_title'>{name}</h1>
                <div className='hostel_separ'></div>
                <ListButton button={button} />
            </div>
            <div className='hostel_area_index'>
                {children}
            </div>
        </div>
    )
}

export default Area