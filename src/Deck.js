import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const BASEURL = `https://deckofcardsapi.com/api/deck/`;

const Deck = () => {
    const [deck, setDeck] = useState(null); //set's deck in state. each deck has a unique id.
    const [drawn, setDrawn] = useState([]);//an array of cards that have be drawn

    const [auto, setAuto] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getDeck() {//async func created
            let deck = await axios.get(`${BASEURL}/new/shuffle`);
            setDeck(deck.data);//sets deck state to deck res data
        }
        getDeck() //call function
    }, [setDeck])//stipulate getData should only be called when setDeck is changed. remember, set deck is called upon initial load. (All states are).

//ok, so not too crazy. we literally just need to wrap this thing up in a timer with some conditionals to check wether or not auto is on.

    async function getCard() {
        try {
            let draw = await axios.get(`${BASEURL}/${deck.deck_id}/draw`);
            if(draw.data.remaining === 0) {
                throw new Error("all out!");
            }
            const card = draw.data.cards[0];
            console.log(card);

            setDrawn(d => {
                return [
                ...d,
                {
                    id: card.code,
                    suit: card.suit,
                    value: card.value
                }
            ]});
        } catch (error) {
            alert(error);
        }
    }

    async function drawCard() {
        await getCard();
    }

    const cards = drawn.map(c => ( //cards is a visual represenation of the drawn cards. Use Card components to create an array and store em in the variable.
        <Card key={c.id} suit={c.suit} value={c.value} />
    ));

    return(
        <ul>
            <button onClick={drawCard}>Draw a card</button>
            {cards}
        </ul>
    )
}

export default Deck;
