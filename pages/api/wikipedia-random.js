import Wikipedia from 'wikijs'

export async function wikipediaRandom(req, res) {

    const page = await Wikipedia.random()

    res.json(page)
}