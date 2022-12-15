// import circa from '../components/Random/styles.module.css'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css'
import Random from './Random'

export const Base = () => {

const [visible, setVisible] = useState(true);
const docRef = useRef(typeof document !== 'undefined' && document)

const [scrollNav, setScrollNav] = useState(false);

const changeNav = () => {
  if (window.scrollY >= 80) {
    setScrollNav(true);
  } else {
    setScrollNav(false);
  }
};

useEffect(() => {
  window.addEventListener('scroll', changeNav);
}, []);

const toggleHome = () => {
  scroll.scrollToTop();
};

const callArticles = () => {
    const doc = docRef.current
  
    const onClick = () => {
      setVisible(false)
    }
  
    doc.addEventListener('click', onClick)
  
    return () => {
      // scroll.scrollToTop();
      doc.removeEventListener('click', onClick)
    }
}

    return (
        <>
        {visible ?
        <div className={styles.content}>
        <span className={styles.lr}>Lightread</span>
        <h1 className={styles.exp}>Imagining interactions with modern literature</h1>
        <p className={styles.p}>Using natural language processing (NLP) techniques to analyze the text word-by-word, providing definitions, phonetics, and links to Wikipedia pages for further learning.</p>
        <h1 className={styles.exp}>Blueprint</h1>
        <p className={styles.p}>
        Two main components: <b>a random article generator</b> and <b>a text analysis module</b>.
The random article generator will use a database of articles to randomly select an article for the user to read. The user will have the option to refresh the page to get a ✨ new random article ✨.
The text analysis module will use NLP techniques to analyze the text from the article or the user&apos;s input. For each word, the module will provide the definition, phonetics, and a link to the Wikipedia page (when available).
        </p>
        {/* </div> */}
        <Link href='/read'>
        <span className={styles.start}>Get started →</span>
        </Link>
        </div>
        : ''}
        {/* {!visible && <Random/>}  */}
        {/* <div id="new-content">
        <Random/>
        </div> */}
        </>
    )
}