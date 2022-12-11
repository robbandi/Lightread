import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { useRouter } from 'next/router'
import Link from 'next/dist/client/link';
import styles from '../NavTitle/styles.module.css'
import Theme from '../../Theme';
// import { render } from 'react-dom';

const Title = ({ post }) => {

  function removeTrailingSlash(str) {
    // let removeSlash = str.replace(/\//,'');
    let keepLastElem = /[^/]*$/.exec(str)[0];
    return keepLastElem.charAt(0).toUpperCase() + keepLastElem.substring(1)
  }

  // console.log("HI" + removeTrailingSlash(window.location.pathname))

  const hostname = typeof window !== 'undefined' && removeTrailingSlash(window.location.pathname) ? removeTrailingSlash(window.location.pathname) : '';

  const [scrollNav, setScrollNav] = useState(false);

  const router = useRouter()

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

  return (
    <>
    <span onClick={() => router.back() ?? '/'}>
    <div className={styles.wrapper}
     scrollNav={scrollNav}
     onClick={toggleHome} to='/'>
    <nav className={styles.nav}>
    <span className={styles.navindex}>
    Lightread
    </span>
    {/* <span className={styles.navindex}> {hostname}</span> */}
    </nav>
     </div>
     </span>
    </>
  );
};

export default Title;