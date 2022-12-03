import { useEffect, useState } from "react";
import styledcomponents from 'styled-components'
import styles from '../Theme/styles.module.css'
import useKey from "../useKey";
import { Moon, Sun, Zap, ZapOff } from "react-feather";

const ToggleThumb = styledcomponents.span`
  transition: transform 0.25s ease-in-out;
  transform: ${(p) =>
    p.activeTheme === ""
      ? "translate3d(calc(var(--toggle-width) - var(--toggle-height)), 0, 0)"
      : "none"};
`;

const Theme = () => {
    const [activeTheme, setActiveTheme] = useState('')
    const inactiveTheme = activeTheme === 'dark' ? 'light' : 'dark' 
    const darkTheme = activeTheme === 'dark'

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

    useEffect(() => {
        document.body.dataset.theme = activeTheme;
    }, [activeTheme])
    

    const handleToggle = (e) => {
        setActiveTheme(inactiveTheme)
        e.preventDefault();
    }

    // const onOff = activeTheme ? {Zap} : {ZapOff}
    
    useKey("KeyT", handleToggle)

  return (
    <span>
    {darkTheme ? 
     <Sun
     className={styles.circle} type="button"
     onKeyDown={(e)=> handleToggle(e)}
     onClick={(e)=> handleToggle(e)}/>
    : 
    <Moon
    className={styles.circle} type="button"
    onKeyDown={(e)=> handleToggle(e)}
    onClick={(e)=> handleToggle(e)}/>}
    </span>
  );
}

export default Theme;