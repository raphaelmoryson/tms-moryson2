import React from 'react';

function Card({ icon, title, percentage, details }) {
    return (
        <div className='moryson_card_dashboard'>
            <div className='moryson_card_icon'>
                {icon}
            </div>
            <div className='moryson_card_content'>
                <div className='moryson_card_header'>
                    <h3 className='moryson_card_title'>{title}</h3>
                    <p className='moryson_card_percentage'>{percentage}</p>
                </div>
                <div className='moryson_card_details'>
                    {details && details.map((detail, index) => (
                        <div key={index} className='moryson_card_detail_item'>
                            <span className='detail_label'>{detail.label}</span>
                            <span className='detail_value'>{detail.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;
