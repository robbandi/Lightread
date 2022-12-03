const Wikipedia = require('wikijs').default

exports.wikipedia = async (req, res) => {
    const {q} = req.query
    const results = await Wikipedia.search(q)

    res.json(results)
}