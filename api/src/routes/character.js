const axios = require('axios');
const { Character, Occupation } = require('../db');
var express = require ('express');
const router = express.Router();
const apiUrl = 'https://breakingbadapi.com/api/characters';
const getApiInfo = require('./Controllers/getApiInfo')

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if(id){
        let characters = await getApiInfo()
        let characterDetail = characters.find(c => c.id == id)
        if(characterDetail){
            return res.status(200).send(characterDetail)
        }
        return res.status(404).send('Character does not exist')
    }
})

router.post('/', async (req, res) => {
    let { name, nickname, birthday, image, status, seasons, occupation } = req.body
    
    let characterCreated = await Character.create(
        {name, nickname, birthday, image, status, seasons}
    )

    let occupationDb = await Occupation.findAll({
        where: {name: occupation}
    })

    characterCreated.addOccupation(occupationDb)
    res.send(characterCreated)
})

module.exports = router;