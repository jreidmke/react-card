import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const BASEURL = `https://deckofcardsapi.com/api/deck/`;

const Deck = () => {
    const [deck, setDeck] = useState(null); //set's deck in state. each deck has a unique id.
    const [drawn, setDrawn] = useState([]);//an array of cards that have be drawn

    useEffect(() => {
        async function getDeck() {//async func created
            let deck = await axios.get(`${BASEURL}/new/shuffle`);
            setDeck(deck.data);//sets deck state to deck res data
        }
        getDeck() //call function
    }, [setDeck])//stipulate getData should only be called when setDeck is changed

    useEffect(() => {
        async function getCard() {
            try {
                let draw = await axios.get(`${BASEURL}/${deck.deck_id}/draw`);
                if(draw.data.remaining === 0) {
                    throw new Error("all out!");
                }

                const card = draw.data.cards[0];
                setDrawn(c => [
                    ...c,
                    {
                        id: card.code,
                        name: `${card.suit} ${card.value}`
                    }
                ]);

            } catch (error) {
                alert(error);
            }
        }
    }, [deck]);

    const cards = drawn.map(c => (
        <Card key={c.id} name={c.name}/>
    ));

    return(
        <ul>
        <button className="Deck-gimme" onClick={drawCard}>Draw a Card </button>
                {cards}
        </ul>
    )
}
