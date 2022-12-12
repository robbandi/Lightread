import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navs/Nav';
import Title from '../components/Navs/NavTitle';
// import Index from '../components/News/';
import Random from '../components/Random'
import Theme from '../components/Theme';
import styles from '../styles/Home.module.css'
import circa from '../components/Random/styles.module.css'
import { Base } from '../components/base';
import Link from 'next/link';
export default function Home() {

  // const [theme, setTheme] = useState("dark");
  const [activeTheme, setActiveTheme] = useState('light');
  const inactiveTheme = activeTheme === 'dark' ? 'light' : 'dark' 

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, []);

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('saved-theme'))
  if (savedTheme) {
    setActiveTheme(savedTheme)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem(
      'saved-theme',
      JSON.stringify(activeTheme)
    )
  }, [activeTheme])

  // const random = () => {
  //   return <Random/>
  // }

  // const news = () => {
  //   return <NewsSpecific/>
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Lightread</title>
        {/* <script src="http://unpkg.com/swipejs/dist/swipe.min.js"/> */}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="128x128" href="favicon.png" />
        <link rel="icon" sizes="192x192" href="favicon.png" />
      </Head>
      <main className={styles.main}>
        {/* {visible && <Base/>} */}
        <Base/>
        {/* {visible && <Base/>}
        {!visible && <Random/>} */}
        </main>
      {/* </body> */}

      <footer className={styles.footer}>
        <p><span><Link href='/'>Lightread</Link></span> by <a href="https://www.robinn.io/"
        target="_blank"
        rel="noopener noreferrer"
        >Robin Naghshbandi <span className={styles.pass}>🔖</span></a></p>
        <br/>
        <a className={styles.source} href="https://www.robinn.io/"
        target="_blank"
        rel="noopener noreferrer"
        >View source on GitHub</a>
      </footer> 
    </div>
  )
}
