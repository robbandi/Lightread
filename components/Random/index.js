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
import { get } from '../../api';
// import { useMediaQuery } from "@mui/material/useMediaQuery";

const Random = () => {
    const [article, setArticle] = useState(null)
    const [news, setNews] = useState(null)
    const [linkedArticle, setLinkedArticle] = useState(null)
    const [wolframalpha, setWolframAlpha] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const [linkedDir, setLinkedDir] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [selectedWord, setSelectedWord] = useState(null)
    const [definition, setDefinition] = useState(null)
    const [definition2, setDefinition2] = useState(null)
    const [definition3, setDefinition3] = useState(null)
    const [origin, setOrigin] = useState(null);
    const [currentDiv, setCurrentDiv] = useState(1)
    // const matches = useMediaQuery('(min-width:768px)');
    const [isPaused, setIsPaused] = useState(true)

const handleMouseDynamic = () => {
  if (isPaused) {
    setIsPaused(false)
  }
}

const handleMouseEnter = () => {
  setIsPaused(true)
}

const handleMouseLeave = () => {
  setIsPaused(false)
}


    // const apiKey = process.env.API_KEY;

    process.env.API_KEY = 'b65f6803-0a14-4ae5-85d3-30a63ec37e61';
    // process.env.API_ID = '03ba8d30';
    // process.env.API_KEY_ORIGIN = '136c1f3b9e6edb57653f46c8d52cd189';

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

    // useEffect(() => {
    //     // Make an HTTPS request to the API server
    //     get('https://api.dictionaryapi.dev/api/v2/entries/en/tracing')
    //       .then((response) => {
    //         // Update the component state with the response data
    //         setSelectedWord(response.data);
    //       })
    //       .catch((error) => {
    //         // Handle any errors here
    //       });
    //   }, []);

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
            setDefinition2(null)
            setDefinition3(null)            
            setOrigin(null)
            setIsSpeaking(null)
            setLinkedArticle(null)
        window.speechSynthesis.cancel()
        speechSynthesis.cancel()
        }
    }, [isFetching])

    // if (definition[0] === '-' && definition[0] === '-') {
    //     const newStr = definition.substring(2)
    //     new capitalStr = newStr[0].toUpperCase()
    //     + newStr.substring(1)
    // } else {
    //     definition
    // }

    // console.log(selectedWord)
    // console.log(linkedArticle)

    // useEffect(() => {
    //     const sourceLang = 'en';
    //     // const wordId = 'hello';
    //     if (selectedWord) {
    //     axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/${sourceLang}/${selectedWord}/pronunciations`, {
    //       headers: {
    //         'app_id': '03ba8d30',
    //         'app_key': 'e76fc04e7ee4e065bddfabd92fb3d344',
    //       },
    //     })
    //       .then((response) => {
    //         setOrigin(response.data[0].results[0].lexicalEntries[0].pronunciations[0].phoneticSpelling);
    //         console.log(origin); // /hɛˈloʊ/
    //       })
    //       .catch((error) => {
    //         // Handle error here
    //       });
    //     } else {
    //         setOrigin(null)
    //         // setLinkedArticle(null)
    //     }
    //   }, [selectedWord]);

    const handleDivChange = () => {
        if (currentDiv === 1) {
          setCurrentDiv(2)
        } else if (currentDiv === 2) {
          setCurrentDiv(3)
        } else if (currentDiv === 3) {
          setCurrentDiv(1)
        }
      }

    useEffect(() => {
        const link = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${selectedWord}?key=${process.env.API_KEY}`
        // const link = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}/pronunciations`
        if (selectedWord) {
            axios
            .get(
            link,
            )
            .then(response => {
                let x = response.data[0].shortdef[0].charAt(0).toUpperCase() + response.data[0].shortdef[0].slice(1) + '.'
                // let x = response.data[0].shortdef[0]
                if (x[0] === '—') {
                    x = x.substring(1)
                    x = x[0].toUpperCase() + x.substring(1)
                    x = x + '.'
                  }

                setDefinition(x)
                let y = response.data[0].shortdef[1].charAt(0).toUpperCase() + response.data[0].shortdef[1].slice(1) + '.'

                if (y[0] === '—') {
                    y = y.substring(1)
                    y = y[0].toUpperCase() + y.substring(1)
                    y = y + '.'
                  }

                setDefinition2(y)
                let z = response.data[0].shortdef[2].charAt(0).toUpperCase() + response.data[0].shortdef[2].slice(1) + '.'

                if (z[0] === '—') {
                    z = z.substring(1)
                    z = z[0].toUpperCase() + z.substring(1)
                    z = z + '.'
                  }

                setDefinition3(z)
                console.log(x)
                console.log(y)
                console.log(z)
                // setDefinition(response.data[0].lexicalEntries[0].pronunciations[0].phoneticSpelling)
                // console.log(response.data[0].shortdef[0])
                // definition.toString()
                // console.log(definition)
                // console.log(definition.charAt(0).toUpperCase())
                // setDefinition(response.data[0].meanings[0].definitions[0].definition)
                // setOrigin(response.data[0].phonetic)
                setOrigin(response.data[0].hwi.prs[0].mw)
                console.log(origin)
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setDefinition(null)
            setDefinition2(null)
            setDefinition3(null)
            setOrigin(null)
            // setLinkedArticle(null)
        }
    }, [selectedWord])

    const handleWordClick = word => {
        if (!word.includes(' ')) {
            setSelectedWord(word)
            // handleDivChange(word)
            getLinkedArticle()
            // setDefinition(word)
            // getLinkedArticle(word)
        }
    }

    const handleWordSelect = event => {
        setSelectedWord(event.target.innerText)
    }

    const handleClickOutside = event => {
        if (selectedWord && !event.target.matches('.highlight')) {
            setSelectedWord(null)
            setWolframAlpha(null)
        }
        setLinkedArticle(null)
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
        }
        speechSynthesis.speak(utterance)
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

    const getNewsArticle = async () => {
        setIsFetching(true)
        const link = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${NEWS_API}`
        try {
            const response = await fetch (
                link
            )
            const data = await response.json()
            setNews(data)
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
            // data/
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
                {/* <p> */}
                {/* <span className={styles.changeDiv} onMouseEnter={handleDivChange}> */}
                <p className={styles.define}>
                <span>{origin}</span>
                {currentDiv === 1 && <span>{definition}</span>}
                {currentDiv === 2 && <span>{definition2}</span>}
                {currentDiv === 3 && <span>{definition3}</span>}
                </p>

                <a href={article.content_urls.desktop.page}></a>
                
                {
                (
                linkedArticle ? linkedArticle && (
                    <p className={styles.wiki} onClick={getLinkedArticle}><FaWikipediaW/>
                    <p>{!linkedArticle.title.includes('Null') ? linkedArticle.extract : ''}</p>
                    </p>
                
                ): '')} 

                {/* {
                (article && (
                    <p className={styles.wolf} onClick={getWolfram}><SiWolfram/>
                    <p>{article.origin.includes("Null") ? '' :  article.origin}</p>
                    </p>
                ))} */}

                {user && (
                    <button onClick={saveArticle}/>
                )}
                                <span className={styles.start}>
                {isSpeaking ? (
                    <span onClick={stop}><Volume/></span>
                ) : (
                    <span onClick={() => speak(article.title && article.extract)}><Volume2/></span>
                )}
                </span>
                </>
            )
        )}
        <div>
        <span className={styles.button}
        onClick={getRandomArticle}>
            {/* <Kinetic/> */}
            </span>
            </div>
            </div>
        </>
    )
}

export default Random;