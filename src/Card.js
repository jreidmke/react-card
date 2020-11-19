import React, { useState, useEffect } from 'react';

//ok. a card has a suit and a value. we'll make our cards an li that displays both

const Card = ({suit, value}) => {
    return(
        <li>This card is the {value} of {suit}.</li>
    )
}

export default Card;