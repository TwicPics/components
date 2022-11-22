
// eslint-disable-next-line no-shadow
import Image from 'next/image';
import MenuBar from "../components/menuBar";
import { twicpicsLoader } from "@twicpics/components/next";
import styles from '../styles/twicPicsLoaderSample.module.css';

const TwicPicsLoaderSample = ( ) => (
    <main>
        <MenuBar></MenuBar>
        <h1>Next.js twicpicsLoader test page</h1>
        <h2>Test</h2>
        <div className="samples">
            <div className={ `item ${ styles.item }` }>
                <Image
                    loader={twicpicsLoader}
                    src="https://assets.twicpics.com/examples/football.jpg"
                    alt="Pure Next image"
                    width={400}
                    height={300}
                />
                <span>Height and with set</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.cover}
                    fill
                    loader={twicpicsLoader}
                    src="image:football.jpg"
                />
                <span>Fill + object-fit: cover</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.contain}
                    fill
                    loader={twicpicsLoader}
                    src="football.jpg"
                />
                <span>Fill + object-fit: contain</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.fill}
                    fill
                    loader={twicpicsLoader}
                    src="football.jpg"
                />
                <span>Fill + object-fit: fill</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.cover}
                    fill
                    loader={twicpicsLoader}
                    src="football.jpg"
                    sizes="(max-width: 768px) 768px,
                    (max-width: 1200px) 1200px,
                    100px"
                />
                <span>Fill + sizes set</span>
            </div>
        </div>
    </main>
);

export default TwicPicsLoaderSample;
