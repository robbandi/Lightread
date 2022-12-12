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