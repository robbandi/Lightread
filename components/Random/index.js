import fetch from "isomorphic-fetch";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../contexts/userContext'
import axios from "axios";
import styles from '../Random/styles.module.css'
import Kinetic from "../Sumi";
import { Moon, Sun, Volume, Volume2, Zap, ZapOff } from "react-feather";
import { FaBeer, FaWikipediaW } from 'react-icons/fa';
import Speech from "../Speech";


const Random = () => {
    const [article, setArticle] = useState(null)
    const [linkedArticle, setLinkedArticle] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const [linkedDir, setLinkedDir] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [selectedWord, setSelectedWord] = useState(null)
    const [definition, setDefinition] = useState(null)

    // const styles = {
    //     selectedWord: {
    //         textDecoration: 'underline'
    //     }
    // }

    const { user } = useContext(UserContext)

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
            setIsSpeaking(null)
            setLinkedArticle(null)
        window.speechSynthesis.cancel()
        speechSynthesis.cancel()
        }
    }, [isFetching])

    console.log(selectedWord)
    console.log(linkedArticle)

    useEffect(() => {
        if (selectedWord) {
            axios
            .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`,
            )
            .then(response => {
                setDefinition(response.data[0].meanings[0].definitions[0].definition)
                // console.log(definition)
                // console.log(true + linkedArticle)
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setDefinition(null)
            setLinkedArticle(null)
        }
    }, [selectedWord])

    const handleWordClick = word => {
        if (!word.includes(' ')) {
            setSelectedWord(word)
            getLinkedArticle(word)
        } else 
        setLinkedArticle(null)
    }

    const handleWordSelect = event => {
        setSelectedWord(event.target.innerText)
    }

    const handleClickOutside = event => {
        if (selectedWord && !event.target.matches('.highlight')) {
            setSelectedWord(null)
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
        try {
            const response = await fetch (
                'http://en.wikipedia.org/api/rest_v1/page/random/summary'
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
        try {
            const response = await fetch (
                `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedWord}`
            )
            const data = await response.json()
            // if (!data.includes('Null may refer to:')) {
            setLinkedArticle(data)
            // }
            console.log(linkedArticle)
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
        {/* {linkedArticle && (
                 <p className={styles.wiki} onClick={getLinkedArticle}><FaWikipediaW/>
                 <p>{linkedArticle.extract}</p>
                 </p>
                 )} */}
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
                    className={
                        word === selectedWord ? 'highlight' : 'outofsight'
                    }
                    >
                    {word}
                    </span>                    
                ))} 
                <p className={styles.define}>{definition}</p>
                <a href={article.content_urls.desktop.page}></a>
            
                {/* <a href={linkedArticle.content_urls.desktop.page}></a> */}

                {/* {linkedArticle && (
                    <>
                    <p>{linkedArticle}</p>
                    </>
                )
                } */}

                {/* <p>{linkedArticle.extract}</p> */}

                {
                (linkedArticle && (
                    <p className={styles.wiki} onClick={getLinkedArticle}><FaWikipediaW/>
                    <p>{linkedArticle.extract.includes("Null") ? '' :  linkedArticle.extract}</p>
                    </p>
                ))}

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
        <span className={styles.button} onClick={getRandomArticle}>
            {/* <Kinetic/> */}
            </span>
            </div>
        </>
    )
}

export default Random;