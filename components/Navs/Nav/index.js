import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { useRouter } from 'next/router'
import Link from 'next/dist/client/link';
import styles from '../Nav/styles.module.css'
import Theme from '../../Theme';
// import { render } from 'react-dom';

const Navbar = ({ post }) => {

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
    <div className={styles.wrapper}>
    <nav className={styles.nav}>
    <span className={styles.navindex}>
    {/* <Theme/> */}
    </span>
    
    {/* <span className={styles.navindex}> {hostname}</span> */}
    </nav>
     </div>
    </>
  );
};

export default Navbar;