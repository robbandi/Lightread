const axios = require('axious')

exports.dictionaryapi = async (req, res) => {
    const {q} = req.query
    const results = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${q}`)

    res.json(results.data)
}