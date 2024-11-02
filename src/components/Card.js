// Card.js
import React from 'react';

function Card({ icon, title, percentage }) {
    return (
        <div className='moryson_card_dashboard'>
            <div className='moryson_card_icon'>
                {icon}
            </div>
            <div className='moryson_card_title'>
                <h1>{title}</h1>
                <p>{percentage}</p>
            </div>
        </div>
    );
}

export default Card;
