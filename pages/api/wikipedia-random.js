const Wikipedia = require('wikijs').default

exports.wikipediaRandom = async (req, res) => {

    const page = await Wikipedia.random()

    res.json(page)
}