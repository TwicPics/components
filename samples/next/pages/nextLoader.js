
// eslint-disable-next-line no-shadow
import Image from 'next/image';
import MenuBar from "../components/menuBar";
import { twicpicsLoader, twicpicsPlaceholder } from "@twicpics/components/next";
import styles from '../styles/twicPicsLoaderSample.module.css';

// this gets called on every request
export async function getServerSideProps( ) {
    const datas = {
        "className": `styles.cover`,
        "src": `image:football.jpg`,
        "txt": `Fill + object-fit: cover + SSR placeholder`,
    };
    datas.blurDataURL = await twicpicsPlaceholder( `image:football.jpg` );
    return {
        "props": {
            datas,
        },
    };
}

const TwicPicsLoaderSample = ( { datas } ) => (
    <main>
        <MenuBar></MenuBar>
        <h1>Next.js twicpicsLoader test page</h1>
        <div className="samples">
            <div className={ `item ${ styles.item }` }>
                <Image
                    loader={twicpicsLoader}
                    src="https://assets.twicpics.com/examples/football.jpg"
                    width={400}
                    height={300}
                />
                <span>Height and with set</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    blurDataURL={datas.blurDataURL}
                    className={styles.cover}
                    fill
                    // eslint-disable-next-line require-await
                    placeholder="blur"
                    loader={twicpicsLoader}
                    src={datas.src}
                />
                <span>{datas.txt}</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    className={styles.cover}
                    fill
                    // eslint-disable-next-line require-await
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
                            100px
                        "
                />
                <span>Fill + sizes set</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.cover}
                    fill
                    loader={twicpicsLoader}
                    src="placeholder:pink"
                />
                <span>Placeholder + Cover + Fill</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.contain}
                    fill
                    loader={twicpicsLoader}
                    src="placeholder:pink"
                />
                <span>Placeholder + Contain + Fill</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.cover}
                    width={400}
                    height={300}
                    loader={twicpicsLoader}
                    src="placeholder:blue"
                />
                <span>Placeholder + Cover + Height and with set</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.contain}
                    width={400}
                    height={300}
                    loader={twicpicsLoader}
                    src="placeholder:blue"
                />
                <span>Placeholder + Contain + Height and with set</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.cover}
                    fill
                    loader={twicpicsLoader}
                    src="placeholder:200x100:medium-violet-red"
                />
                <span>placeholder:200x100:medium-violet-red + Cover + Fill</span>
            </div>
            <div className={ `item ${ styles.item }` }>
                <Image
                    alt="twicpicsLoader"
                    className={styles.contain}
                    fill
                    loader={twicpicsLoader}
                    src="placeholder:200x100:medium-violet-red"
                />
                <span>placeholder:200x100:medium-violet-red + Contain + Fill</span>
            </div>
        </div>
    </main>
);

export default TwicPicsLoaderSample;
