import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';
import Swal from 'sweetalert2'

let numberOfMoves = 0;

function Home() {
    const fullDeck = [
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
        { id: 17, name: 'four cards', image: 'four_cards.png' },
        { id: 18, name: 'four cards', image: 'four_cards.png' },
        { id: 19, name: 'boardgame', image: 'boardgame2.png' },
        { id: 20, name: 'boardgame', image: 'boardgame2.png' },
        { id: 21, name: 'dominos', image: 'dominos.png' },
        { id: 22, name: 'dominos', image: 'dominos.png' },
        { id: 23, name: 'tokens', image: 'tokens.png' },
        { id: 24, name: 'tokens', image: 'tokens.png' },
    ];
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [deck, setDeck] = useState([...fullDeck.slice(0, 20)]);
    const [timer, setTimer] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    // const shuffleDeck = () => {
    //     const shuffledDeck = [...deck];
    //     for (let i = shuffledDeck.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    //     }
    //     setDeck(shuffledDeck);
    // };

    const shuffleDeck = () => {
        setIsShuffling(true); // Trigger animation
        const shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        setTimeout(() => {
            setIsShuffling(false); // Stop animation after a delay
            setDeck(shuffledDeck);
        }, 1000); // Adjust the duration of the animation
    };

    useEffect(() => {
        // shuffleDeck();
        setIsGameStarted(false);
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
                confirmButtonColor: '#e55c21',
                confirmButtonText: 'Ok!'
            });
        }
    }, [matched]);

    const startTimer = (initialValue) => {
        setTimer(initialValue);
        if (initialValue !== 0) {
            const id = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setIntervalId(id);
        }
        else {
            clearInterval(intervalId);
        }
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

    const reset = () => {
        setSelected([]);
        setMatched([]);
        numberOfMoves = 0;
    };

    const easyMode = () => {
        reset();
        setDeck(fullDeck.slice(0, 10));
        startTimer(0);
        setIsGameStarted(false);
    };

    const mediumMode = () => {
        reset();
        setDeck(fullDeck.slice(0, 20));
        startTimer(0);
        setIsGameStarted(false);
    };

    const hardMode = () => {
        reset();
        setDeck(fullDeck);
        startTimer(0);
        setIsGameStarted(false);
    };

    const startNewGame = () => {
        shuffleDeck();
        reset();
        // setDeck([...fullDeck]);
        setTimer(0);
        startTimer(1);
        setIsGameStarted(true);
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
                isShuffling={isShuffling}
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
                        {/* <div className={styles.levelButtons}>
                            <div className={styles.levelButton}>
                                <button class={styles.button82pushable} onClick={easyMode}>
                                    <span class={styles.button82shadow}></span>
                                    <span class={styles.button82edge}></span>
                                    <span class={styles.button82front}>
                                        Easy
                                    </span>
                                </button>
                            </div>
                            <div className={styles.levelButton}>
                                <button class={styles.button82pushable} onClick={mediumMode}>
                                    <span class={styles.button82shadow}></span>
                                    <span class={styles.button82edge}></span>
                                    <span class={styles.button82front}>
                                        Medium
                                    </span>
                                </button>
                            </div>
                            <div className={styles.levelButton}>
                                <button class={styles.button82pushable} onClick={hardMode}>
                                    <span class={styles.button82shadow}></span>
                                    <span class={styles.button82edge}></span>
                                    <span class={styles.button82front}>
                                        Hard
                                    </span>
                                </button>
                            </div>
                        </div> */}
                        <div className={styles.levelButtons}>
                            <select className={styles.button82front} onChange={(e) => {
                                if (e.target.value === "easy") {
                                    easyMode();
                                }
                                else if (e.target.value === "medium") {
                                    mediumMode();
                                }
                                else if (e.target.value === "hard") {
                                    hardMode();
                                }
                            }}>
                                <option value="select">Select Level</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div className={styles.restart}>
                            <button class={styles.button82pushable} onClick={startNewGame}>
                                <span class={styles.button82shadow}></span>
                                <span class={styles.button82edge}></span>
                                <span class={styles.button82front}>
                                    Start New Game
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
                    <div className={styles.grid} >
                        {cardsToDisplay}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
