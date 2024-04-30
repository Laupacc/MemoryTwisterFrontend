import Image from 'next/image';
import styles from '../styles/Card.module.css';
import Pixel from '../public/images/Pixelateimage.png';

function Card(props) {
    return (
        <div onClick={() => props.selectCard(props.id)} className={`${styles.card} ${props.selected && styles.active}`}>
            <div className={styles.flipper}>
                <div className={styles.cardFront}>
                    <Image src={Pixel} className={styles.emoji} width={50} height={50} />
                </div>
                <div className={styles.cardBack}>
                    <Image src={`/images/${props.image}`} alt={props.name} width={50} height={50} />
                </div>
            </div>
        </div>
    );
}

export default Card;
