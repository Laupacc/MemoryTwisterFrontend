import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [deck, setDeck] = useState([
        { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
        { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
        { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
        { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
        { id: 5, name: 'cactus', image: '/cactus.svg' },
        { id: 6, name: 'cactus', image: '/cactus.svg' },
        { id: 7, name: 'dog', image: '/dog.svg' },
        { id: 8, name: 'dog', image: '/dog.svg' },
        { id: 9, name: 'laptop', image: '/laptop.svg' },
        { id: 10, name: 'laptop', image: '/laptop.svg' },
        { id: 11, name: 'octopus', image: '/octopus.svg' },
        { id: 12, name: 'octopus', image: '/octopus.svg' },
        { id: 13, name: 'strawberry', image: '/strawberry.svg' },
        { id: 14, name: 'strawberry', image: '/strawberry.svg' },
        { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
        { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
    ]);

    const shuffleDeck = () => {
        const shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        setDeck(shuffledDeck);
    };

    useEffect(() => {
        shuffleDeck();
    }, []);


    const selectCard = (id) => {
        if (selected.length === 2) {
            // If two cards are already selected, do nothing
            return;
        }

        setSelected([...selected, id]);
        if (selected.length === 1) {
            // If it's the second card, check for a match
            if (deck.find(card => card.id === selected[0]).name === deck.find(card => card.id === id).name) {
                setMatched([...matched, selected[0], id]);
            }
            // Clear selected after a short delay
            setTimeout(() => {
                setSelected([]);
            }, 1000);
        }
    };

    const cardsToDisplay = deck.map((card) => {
        return (
            <Card
                key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
                selectCard={selectCard}
                selected={selected.includes(card.id) || matched.includes(card.id)}
            />
        );
    });

    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>
                    Memory Game 🧠
                </h1>
                <div className={styles.headerDivider} />
            </div>

            <div className={styles.main}>
                <div className={styles.grid}>
                    {cardsToDisplay}
                </div>
            </div>
        </div>
    );
}

export default Home;
