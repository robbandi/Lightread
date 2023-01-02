import fetch from "isomorphic-fetch";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from '../../contexts/userContext'
import axios from "axios";
import styles from '../Random/styles.module.css'
import { ArrowRight, Circle, Moon, Sun, Volume, Volume2, Zap, ZapOff } from "react-feather";
import { Fa500Px, FaBeer, FaWikipediaW } from 'react-icons/fa';
// import { SiWolfram } from 'react-icons/si'
import { get } from '../../api';
import Theme from "../Theme";
// import { useMediaQuery } from "@mui/material/useMediaQuery";

const Random = () => {
    const [article, setArticle] = useState(null)
    const [related, setRelatedNode ] = useState(null)
    const [news, setNews] = useState(null)
    const [linkedArticle, setLinkedArticle] = useState(null)
    const [linkedArticleTwo, setLinkedArticleTwo] = useState(null)
    const [linkedArticleThree, setLinkedArticleThree] = useState(null)
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
            setDefinition2(null)
            setDefinition3(null)            
            setOrigin(null)
            setIsSpeaking(null)
            setLinkedArticle(null)
            setLinkedArticleTwo(null)
            setLinkedArticleThree(null)
            setRelatedNode(null)
        window.speechSynthesis.cancel()
        speechSynthesis.cancel()
        }
    }, [isFetching])

    const handleDivChange = () => {
        if (currentDiv === 1) {
          setCurrentDiv(2)
        } else if (currentDiv === 2) {
          setCurrentDiv(3)
        } else if (currentDiv === 3) {
          setCurrentDiv(1)
        }
      }

      const handleOptOne = () => {
        if (currentDiv === 1) {
            setCurrentDiv(1)
        }
    }

    const handleOptTwo = () => {
        if (currentDiv === 2) {
            setCurrentDiv(2)
        }
    }

    const handleOptThree = () => {
        if (currentDiv === 3) {
            setCurrentDiv(3)
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
                // console.log(x)
                // console.log(y)
                // console.log(z)
                setOrigin(response.data[0].hwi.prs[0].mw)
                // console.log(origin)
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setDefinition(null)
            setDefinition2(null)
            setDefinition3(null)
            setOrigin(null)
        }
    }, [selectedWord])

    const handleWordClick = word => {
        if (!word.includes(' ')) {
            setSelectedWord(word)
            getLinkedArticle()
            handleDivChange()
            // nodeRelation()
        }
    }

    const handleWordSelect = event => {
        setSelectedWord(event.target.innerText)
    }

    const handleClickOutside = event => {
        if (selectedWord && !event.target.matches('.highlight')) {
            setSelectedWord(null)
            setWolframAlpha(null)
            setDefinition(null)
            setDefinition2(null)
            setDefinition3(null)
        }
        setLinkedArticle(null)
        setLinkedArticleTwo(null)
        setLinkedArticleThree(null)
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
        // console.log(link)
        try {
            const response = await fetch (
                link
            )
            const data = await response.json()
            setArticle(data)
            getNextArticleOne()
            // setRelatedNode(data.pages.slice(1, 4))
        } catch (error) {
            
        } finally {
            setIsFetching(false)
        }
    }

    // const getNextArticleOne = async () => {
    //     setIsFetching(true)
    //     const link = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'
    //     console.log(link)
    //     try {
    //         const response = await fetch (
    //             link
    //         )
    //         const data = await response.json()
    //         setLinkedArticleTwo(data)
    //     } catch (error) {
            
    //     } finally {
    //         setIsFetching(false)
    //     }
    // }

    // const nodeRelation = async () => {
    //     setLinkedDir(true)
    //     const link = `https://en.wikipedia.org/api/rest_v1/page/extract/${selectedWord}`
    //     try {
    //       const response = await fetch(link)
    //       const data = await response.json()
    //       // get the first three keywords from the extracted text
    //       const keywords = data.extract.split(' ').slice(0, 3)
    //       // retrieve related articles for each keyword
    //       const articles = await Promise.all(
    //         keywords.map(async keyword => {
    //           const response = await fetch(
    //             `https://en.wikipedia.org/api/rest_v1/page/related/${keyword}`
    //           )
    //           const data = await response.json()
    //           console.log(data)
    //           return data.pages[0]
    //         })
    //       )
    //       // store the related articles in the linkedArticles state variable
    //       setRelatedNode(articles)
    //       console.log(articles)
    //     } catch (error) {
    //       // handle error
    //     } finally {
    //       setLinkedDir(false)
    //     }
    //   }

    const getNewsArticle = async () => {
        setIsFetching(true)
        const link = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEWS_API}`
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
            setLinkedArticle(data)
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
        <div className={styles.wrapper}>
     <nav className={styles.nav}>
        <span className={styles.navindex}>
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
            </span>
            <span className={styles.navindex}>
            <span className={styles.line}>I</span>
            <Theme/>
            </span>
            <span className={styles.navindex}>
            <span className={styles.line}>I</span>
        <span onClick={getRandomArticle}>
        <ArrowRight/>
        </span>
        </span>
        </nav>
        </div>
        <div onClick={handleClickOutside}>
        {isFetching ? (
            <p>Loading...</p>
        ) : (
            article && (
                <>
                <div className={styles.artmove}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.desc}>{article.description}</p>
                
                {article.extract.split(/\b/).map((word, index) => (
                    <span key={index} 
                    onClick={() => handleWordClick(word)}
                    
                    // ontouchstart={() => handleWordClick(word)}
                    className={
                        word === selectedWord ? 'highlight' : 'outofsight'
                    }
                    >
                    <span className={styles.light}>
                    {word}
                    </span>
                    </span>                    
                ))
                } 
                {/* <p> */}
                {/* <span className={styles.changeDiv} onMouseEnter={handleDivChange}/> */}
                <p className={styles.define}>
                <span className={styles.phonetic}>{origin}
                </span>
                {/* <button className={styles.optone} onMouseEnter={handleDivChange}>🔄</button> */}
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
                (
                linkedArticleTwo ? linkedArticleTwo && (
                    <div className={styles.next}>
                    <h1 className={styles.title}>{linkedArticleTwo.title}</h1>
                    <p className={styles.desc}>{linkedArticleTwo.description}</p>
                    </div>
                
                ): '')} 

                {
                (
                linkedArticleThree ? linkedArticleThree && (
                    <>
                    <h1 className={styles.title}>{linkedArticleThree.title}</h1>
                    <p className={styles.desc}>{linkedArticleThree.description}</p>
                    </>
                
                ): '')}  */}

                {/* {
                (article && (
                    <p className={styles.wolf} onClick={getWolfram}><SiWolfram/>
                    <p>{article.origin.includes("Null") ? '' :  article.origin}</p>
                    </p>
                ))} */}
                </div>
                </>
            )
        )}
        <div>
            </div>
            </div>
        </>
    )
}

export default Random;