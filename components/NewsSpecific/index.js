// import React from "react";
// import fetch from "isomorphic-fetch";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from '../../contexts/userContext';

// import styles from '../NewsSpecific/styles.module.css';
// import Kinetic from "../Sumi";
// import { FaBeer, FaWikipediaW } from 'react-icons/fa';
// import axios from "axios";
// import { Volume, Volume2 } from "react-feather";

// const Random = () => {
// const [selectedArticle, setSelectedArticle] = useState(null);
// const [news, setNews] = useState(null);
// const [isFetching, setIsFetching] = useState(false);
// const [linkedDir, setLinkedDir] = useState(false);
// const [selectedWord, setSelectedWord] = useState(null)
// const [origin, setOrigin] = useState(null);
// const [isSpeaking, setIsSpeaking] = useState(false)
// const [currentDiv, setCurrentDiv] = useState(1)
// const [definition, setDefinition] = useState(null)
// const [definition2, setDefinition2] = useState(null)
// const [definition3, setDefinition3] = useState(null)
// const [linkedArticle, setLinkedArticle] = useState(null);

// useEffect(() => {
//     if (isFetching) {
//         setNews(null)
//         setSelectedWord(null)
//         setDefinition(null)
//         setDefinition2(null)
//         setDefinition3(null)            
//         setOrigin(null)
//         setLinkedArticle(null)
//     }
// }, [isFetching])

// useEffect(() => {
//     const link = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${selectedWord}?key=${process.env.API_KEY}`
//     // const link = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}/pronunciations`
//     if (selectedWord) {
//         axios
//         .get(
//         link,
//         )
//         .then(response => {
//             let x = response.data[0].shortdef[0].charAt(0).toUpperCase() + response.data[0].shortdef[0].slice(1) + '.'
//             // let x = response.data[0].shortdef[0]
//             if (x[0] === '—') {
//                 x = x.substring(1)
//                 x = x[0].toUpperCase() + x.substring(1)
//                 x = x + '.'
//               }

//             setDefinition(x)
//             let y = response.data[0].shortdef[1].charAt(0).toUpperCase() + response.data[0].shortdef[1].slice(1) + '.'

//             if (y[0] === '—') {
//                 y = y.substring(1)
//                 y = y[0].toUpperCase() + y.substring(1)
//                 y = y + '.'
//               }

//             setDefinition2(y)
//             let z = response.data[0].shortdef[2].charAt(0).toUpperCase() + response.data[0].shortdef[2].slice(1) + '.'

//             if (z[0] === '—') {
//                 z = z.substring(1)
//                 z = z[0].toUpperCase() + z.substring(1)
//                 z = z + '.'
//               }

//             setDefinition3(z)
//             console.log(x)
//             console.log(y)
//             console.log(z)
//             // setDefinition(response.data[0].lexicalEntries[0].pronunciations[0].phoneticSpelling)
//             // console.log(response.data[0].shortdef[0])
//             // definition.toString()
//             // console.log(definition)
//             // console.log(definition.charAt(0).toUpperCase())
//             // setDefinition(response.data[0].meanings[0].definitions[0].definition)
//             // setOrigin(response.data[0].phonetic)
//             setOrigin(response.data[0].hwi.prs[0].mw)
//             console.log(origin)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     } else {
//         setDefinition(null)
//         setDefinition2(null)
//         setDefinition3(null)
//         setOrigin(null)
//         setLinkedArticle(null)
//     }
// }, [selectedWord])

// useEffect(() => {
//     setSelectedWord(null)
//     document.querySelectorAll('.selected-word', 'unselected-word')
//     .forEach((element) => {
//         element.classList.remove('.selected-word', 'unselected-word')
//     })
// }, [])

// const getLinkedArticle = async () => {
//     setLinkedDir(true)
//     const link = `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedWord}`
//     try {
//         const response = await fetch (
//             link
//         )
//         const data = await response.json()
//         // data/
//         setLinkedArticle(data)
//         // console.log(linkedArticle)
//     } catch (error) {
        
//     } finally {
//         setLinkedDir(false)
//     }
// }

// const getNewsArticle = async () => {
//     setIsFetching(true);
//     const link = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API}`;
//     try {
//       const response = await fetch(link);
//       const data = await response.json();
  
//       // initialize the "news" variable with an empty object
//     //   if (!news) {
//     //     news = {};
//     //   }
  
//       // initialize the "articles" property of the "news" object with an empty array
//     //   if (!news.articles) {
//     //     news.articles = [];
//     //   }
  
//     //   initialize the "temp" variable with a default value
//     //   if (!temp || temp < 0 || temp >= news.articles.length) {
//     //     temp = 0;
//     //   }
  
//       setNews(data);
//       console.log(data)
//     } catch (error) {
//       // handle error
//     } finally {
//       setIsFetching(false);
//       tempChange();
//     }
//   };

// // useEffect(() => {
// //     getNewsArticle();
// // }, []);

// const [temp, setTemp] = useState(0)

// const tempChange = async () => {
//     if (news) {
//       const randomIndex = Math.floor(Math.random() * news.articles.length);
//       setTemp(randomIndex);
//     }
//   }

// console.log(temp)

// const handleClickOutside = event => {
//     if (selectedWord && !event.target.matches('.highlight')) {
//         setSelectedWord(null)
//     }
//     setLinkedArticle(null)
// }

// const handleWordClick = word => {
//     if (!word.includes(' ')) {
//         setSelectedWord(word)
//         // handleDivChange(word)
//         // setDefinition(word)
//         getLinkedArticle(word)
//     }
// }

 
// const speak = text => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 0.9
//     utterance.onboundary = function(event) {
//     const node = document.createTextNode(text)
//     const range = document.createRange()
//     range.setStart(node, event.charIndex)
//     range.setEnd(node, event.charIndex + event.charLength)
//     const selection = window.getSelection()
//     selection.removeAllRanges()
//     selection.addRange(range)
//     const span = document.createElement('span')
//     span.classList.add('underline')
//     const contents = range.extractContents()
//     }
//     speechSynthesis.speak(utterance)
//     setIsSpeaking(true)
// }

// const stop = () => {
//     speechSynthesis.cancel() 
    
//     setIsSpeaking(false)
// }

// // const title = news.articles[temp].title;
// // const hyphenIndex = title.lastIndexOf('-');
// // const truncatedTitle = hyphenIndex === -1 ? title : title.substring(0, hyphenIndex);

// // const hyphenIndex = title.lastIndexOf('-');
// // const truncatedTitle = hyphenIndex === -1 ? title : title.substring(0, hyphenIndex);

// return (
//     <>
//         <div onClick={handleClickOutside}>
//         {isFetching ? (
//             <p>Loading...</p>
//         ) : (
//              news && (
//                 <>
//                     {/* <h1 className={styles.title}>{news.articles[temp].title}</h1> */}
//                     <p>{news.articles[temp].source.Name}</p>
//                     {news.articles[temp].title.replace(new RegExp(news.articles[temp].source.Name, "g"), "").slice(0, -2).split(/\b/).map((word, index) => (
//                      <span key={index}
//                      onClick={() => handleWordClick(word)}
                     
//                      // ontouchstart={() => handleWordClick(word)}
//                      className={
//                          word === selectedWord ? 'highlight' : 'outofsight'
//                      }
//                      >
//                     <h1 className={styles.news}>
//                      {word}
//                      </h1>
//                      </span>
//                      ))}
//                      <a className={styles.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     href={news.articles[temp].url}>🔗</a> 


//                 <p className={styles.define}>
//                 <span>{origin}</span>
//                 {currentDiv === 1 && <span>{definition}</span>}
//                 {currentDiv === 2 && <span>{definition2}</span>}
//                 {currentDiv === 3 && <span>{definition3}</span>}
//                 </p>

//                 {
//                 (
//                 linkedArticle ? linkedArticle && (
//                     <p className={styles.wiki} onClick={getLinkedArticle}><FaWikipediaW/>
//                     <p>{!linkedArticle.title.includes('Null') ? linkedArticle.extract : ''}</p>
//                     </p>
                
//                 ): '')} 


//                 <span className={styles.start}>
//                 {isSpeaking ? (
//                     <span onClick={stop}><Volume/></span>
//                 ) : (
//                     <span onClick={() => speak(article.title && article.extract)}><Volume2/></span>
//                     )}
//                     </span>
//                     </>
//                 )
//             )}

//             <div>
//             <span className={styles.button}
//             onClick={getNewsArticle}>
//                 {/* <Kinetic/> */}
//                 </span>
//                 </div>
//                 </div>
//             </>
//         )
//     }

// export default Random;