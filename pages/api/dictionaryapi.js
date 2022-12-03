import { get } from 'axios'

export async function dictionaryapi(req, res) {
    const {q} = req.query
    const results = await get(`https://api.dictionaryapi.dev/api/v2/entries/en/${q}`)

    res.json(results.data)
}