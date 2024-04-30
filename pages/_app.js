import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Memory Game</title>
                <link rel="icon" href="favicon.ico" />
                <meta name="description" content="A fun memory game where you flip and match cards" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
