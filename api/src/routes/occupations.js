const axios = require('axios');
const { Occupation } = require('../db');
var express = require ('express');
const router = express.Router();
const apiUrl = 'https://breakingbadapi.com/api/characters';

router.get('/', async (req, res) => {
    const infoApi = await axios.get(apiUrl);
    const occupations = infoApi.data.map(o => o.occupation).flat()

    occupations.forEach(o => {
        Occupation.findOrCreate({
            where: {
                name: o
            }
        })
    })

    let allOccupations = await Occupation.findAll({
        attributes: ['name']
    })

    allOccupations = allOccupations.map(a => a.name).sort()
    
    res.send(allOccupations)
})

module.exports = router;