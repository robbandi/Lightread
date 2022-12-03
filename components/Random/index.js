import fetch from "isomorphic-fetch";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../contexts/userContext'
import axios from "axios";
import styles from '../Random/styles.module.css'
import Kinetic from "../Sumi";
import { Moon, Sun, Volume, Volume2, Zap, ZapOff } from "react-feather";
import { FaBeer, FaWikipediaW } from 'react-icons/fa';
import { SiWolfram } from 'react-icons/si'
import Speech from "../Speech";
// import { Html } from "next/document";
// import Swipe from 'swipejs'


const Random = () => {
    const [article, setArticle] = useState(null)
    const [linkedArticle, setLinkedArticle] = useState(null)
    const [wolframalpha, setWolframAlpha] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const [linkedDir, setLinkedDir] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [selectedWord, setSelectedWord] = useState(null)
    const [definition, setDefinition] = useState(null)
    const [origin, setOrigin] = useState(null)

    // function extractStringsFromHtml(html) {
    //     const regex = /"([^"]*)"/g
    //     const matches = html.toString().match(regex)

    //     return matches
    // }

    // const strings = extractStringsFromHtml(Html)

    // const detectUrl = 'https://translation.googleapis.com/language/translate/v2/detect';
    // axios.post(detectUrl, {
    //   q: strings,
    // })
    //   .then((response) => {
    //     const detectedLanguage = response.data.data.detections[0][0].language;
    
    //     const translateUrl = 'https://translation.googleapis.com/language/translate/v2';
    //     axios.post(translateUrl, {
    //       q: strings,
    //       target: detectedLanguage,
    //     })
    //       .then((response) => {
    //         const translatedText = response.data.data.translations[0].translatedText;
    //         console.log(translatedText);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    
    const { user } = useContext(UserContext)

    // useEffect(() => {
    //     const swipeElement = document.querySelector('#gesture')
    //     const swipe = new Swipe(swipeElement)
    //     console.log(swipe)
    // }, [])

    useEffect(() => {
        setSelectedWord(null)
        document.querySelectorAll('.selected-word', 'unselected-word')
        .forEach((element) => {
            element.classList.remove('.selected-word', 'unselected-word')
        })
    }, [])

    useEffect(() => {
        if (isFetching) {
            setSelectedWord(null)
            setDefinition(null)
            setOrigin(null)
            setIsSpeaking(null)
            setLinkedArticle(null)
        window.speechSynthesis.cancel()
        speechSynthesis.cancel()
        }
    }, [isFetching])

    console.log(selectedWord)
    console.log(linkedArticle)

    useEffect(() => {
        const link = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
        if (selectedWord) {
            axios
            .get(
            link,
            )
            .then(response => {
                setDefinition(response.data[0].meanings[0].definitions[0].definition)
                setOrigin(response.data[0].phonetic)
                console.log(origin)
                // setLinkedArticle()
                // setWolframAlpha()
                // console.log(definition)
                // console.log(true + linkedArticle)
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setDefinition(null)
            setOrigin(null)
            // setLinkedArticle(null)
        }
    }, [selectedWord])

    const handleWordClick = word => {
        if (!word.includes(' ')) {
            setSelectedWord(word)
            getLinkedArticle(word)
            // getLinkedArticle(word)
        } 
    }

    const handleWordSelect = event => {
        setSelectedWord(event.target.innerText)
    }

    const handleClickOutside = event => {
        if (selectedWord && !event.target.matches('.highlight')) {
            setSelectedWord(null)
            setLinkedArticle(null)
            setWolframAlpha(null)
        }
    }

    const handleMouseMove = event => {
        setSelectedWord(event.target.innerText)
        event.target.classList.add(styles.blur)
        event.target.classList.remove(styles.highlight)
    }
 
    const speak = text => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9
        utterance.onboundary = function(event) {
        const node = document.createTextNode(text)
        const range = document.createRange()
        range.setStart(node, event.charIndex)
        range.setEnd(node, event.charIndex + event.charLength)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        const span = document.createElement('span')
        span.classList.add('underline')
        const contents = range.extractContents()
        // span.appendChild(contents)
        // range.insertNode(span)
        // setSelectedWord(event.name)
        }
        // window.speechSynthesis.speak(utterance)
        speechSynthesis.speak(utterance)
        // console.log(selectedWord)
        setIsSpeaking(true)
    }

    const stop = () => {
        speechSynthesis.cancel() 
        
        setIsSpeaking(false)
    }

    const getRandomArticle = async () => {
        setIsFetching(true)
        const link = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'
        try {
            const response = await fetch (
                link
            )
            const data = await response.json()
            setArticle(data)
        } catch (error) {
            
        } finally {
            setIsFetching(false)
        }
    }

    const getLinkedArticle = async () => {
        setLinkedDir(true)
        const link = `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedWord}`
        try {
            const response = await fetch (
                link
            )
            const data = await response.json()
            setLinkedArticle(data)
            // console.log(linkedArticle)
        } catch (error) {
            
        } finally {
            setLinkedDir(false)
        }
    }

    const getWolfram = async () => {
        setLinkedDir(true)
        const link = `https://www.wolframalpha.com/input?i=${selectedWord}`
        try {
            const response = await fetch (
                link
            )
            const data = await response.json()
            setWolframAlpha(data)
            // console.log(linkedArticle)
        } catch (error) {
            
        } finally {
            setLinkedDir(false)
        }
    }

    const saveArticle = async () => {
        try {
            const response = await fetch('/api/save-article', {
                method: 'POST',
                body: JSON.stringify({
                    article: article,
                    user: user
                })
            })
            const data = await response.json()
            if (data.success) {
                alert("S")
            } else {
                alert(data.message)
            }
        } catch (error) {
            
        }
    }
    
    return (
        <>
        <div onClick={handleClickOutside}>
        {isFetching ? (
            <p>Loading...</p>
        ) : (
            article && (
                <>
                <h1 className={styles.title}>{article.title}</h1>
                <p>{article.description}</p>
                
                {article.extract.split(/\b/).map((word, index) => (
                    <span key={index} 
                    onClick={() => handleWordClick(word)}
                    // ontouchstart={() => handleWordClick(word)}
                    className={
                        word === selectedWord ? 'highlight' : 'outofsight'
                    }
                    >
                    {word}
                    </span>                    
                ))
                } 
                <p className={styles.define}>
                <span>{origin}</span>
                <span>{definition}</span>
                </p>
                <a href={article.content_urls.desktop.page}></a>
                
                {
                (
                linkedArticle ? linkedArticle && (
                    <p className={styles.wiki} onClick={getLinkedArticle}><FaWikipediaW/>
                    <p>{linkedArticle.extract.includes("Null") ? '' :  linkedArticle.extract}</p>
                    </p>
                
                ): '')} 

                {/* {
                (article && (
                    <p className={styles.wolf} onClick={getWolfram}><SiWolfram/>
                    <p>{article.origin.includes("Null") ? '' :  article.origin}</p>
                    </p>
                ))} */}
                
            
                {/* {
                (linkedArticle && (
                    <p className={styles.wiki} onClick={getLinkedArticle}><FaWikipediaW/>
                    <p>{linkedArticle.extract.includes("Null") ? '' :  linkedArticle.extract}</p>
                    </p>
                ))} */}

                {/* <p>{linkedArticle.extract}</p> */}

                {user && (
                    <button onClick={saveArticle}/>
                )}
                                <span className={styles.start}>
                {isSpeaking ? (
                    <button onClick={stop}><Volume/></button>
                ) : (
                    <button onClick={() => speak(article.title && article.extract)}><Volume2/></button>
                )}
                </span>
                </>
            )
        )}
        <div></div>
        <span id="gesture" className={styles.button} onClick={getRandomArticle}>
            {/* <Kinetic/> */}
            </span>
            </div>
        </>
    )
}

export default Random;