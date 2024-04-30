import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';
import Swal from 'sweetalert2'

let numberOfMoves = 0;

function Home() {
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [deck, setDeck] = useState([
        { id: 1, name: 'dice', image: 'dice.png' },
        { id: 2, name: 'dice', image: 'dice.png' },
        { id: 3, name: 'joystick', image: 'joystick.png' },
        { id: 4, name: 'joystick', image: 'joystick.png' },
        { id: 5, name: 'new controller', image: 'new_controller.png' },
        { id: 6, name: 'new controller', image: 'new_controller.png' },
        { id: 7, name: 'spinwheel', image: 'spinwheel.png' },
        { id: 8, name: 'spinwheel', image: 'spinwheel.png' },
        { id: 9, name: 'multidice', image: 'multidice.png' },
        { id: 10, name: 'multidice', image: 'multidice.png' },
        { id: 11, name: 'old controller', image: 'old_controller.png' },
        { id: 12, name: 'old controller', image: 'old_controller.png' },
        { id: 13, name: 'bowling', image: 'bowling.png' },
        { id: 14, name: 'bowling', image: 'bowling.png' },
        { id: 15, name: 'snooker', image: 'snooker.png' },
        { id: 16, name: 'snooker', image: 'snooker.png' },
    ]);
    const [timer, setTimer] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

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
        startTimer();
        setIsGameStarted(true);
    }, []);

    useEffect(() => {
        if (matched.length === deck.length) {
            setIsGameStarted(false);
            clearInterval(intervalId);
            Swal.fire({
                title: 'Sweet!',
                text: `You've won in ${numberOfMoves} moves and ${formatTime(timer)}!`,
                imageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTc1aHA2dmR6ZG1lYXFlMXVkbWh2bHQ3ZjAwd2s5MzBpeDV5djQ1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QBC5foQmcOkdq/giphy.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Clapping hands",
            });
        }
    }, [matched]);

    const startTimer = () => {
        const id = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        setIntervalId(id);
    };


    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const selectCard = (id) => {
        if (selected.length === 2 || !isGameStarted) {
            // If two cards are already selected, do nothing
            return;
        }
        setSelected([...selected, id]);
        if (selected.length === 1) {
            // this means that the current card is the second card being selected
            // check if the two selected cards are a match
            if (deck.find(card => card.id === selected[0]).name === deck.find(card => card.id === id).name) {
                setMatched([...matched, selected[0], id]);
            }
            // increment the number of moves
            numberOfMoves++;
            // this will clear the selected cards after 1 second
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
            <div className={styles.background}>
                <div className={styles.chessBackground}></div>
                <div className={styles.cardsBackground}></div>
            </div>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerInside}>
                        <div className={styles.headerTitle}>
                            Memory Twister
                        </div>
                        <div className={styles.restart} onClick={() => window.location.reload()}>
                            <button class={styles.button82pushable}>
                                <span class={styles.button82shadow}></span>
                                <span class={styles.button82edge}></span>
                                <span class={styles.button82front}>
                                    New Game
                                </span>
                            </button>
                        </div>
                        <div className={styles.movesandtimer}>
                            <div className={styles.moves}>
                                Moves: {numberOfMoves}
                            </div>
                            <div className={styles.timer}>
                                Time: {formatTime(timer)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerDivider}>
                    </div>
                </div>


                <div className={styles.main}>
                    <div className={styles.grid}>
                        {cardsToDisplay}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
