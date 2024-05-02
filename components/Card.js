import Image from 'next/image';
import styles from '../styles/Card.module.css';
import Pixel from '../public/images/Pixelateimage.png';
import Thinker from '../public/images/theThinker.png';

function Card(props) {

    return (
        <div onClick={() => props.selectCard(props.id)} className={`${styles.card} ${props.selected && styles.active} ${props.isShuffling && styles.shuffling}`}>
            <div className={styles.flipper}>
                <div className={styles.cardFront}>
                    <Image src={Pixel} className={styles.emoji} />
                </div>
                <div className={styles.cardBack} >
                    <img className={styles.image} src={`/images/${props.image}`} alt={props.name} />
                </div>
            </div>
        </div>
    );
}

export default Card;
