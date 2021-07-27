const axios = require('axios');
const { Character, Occupation } = require('../db');
var express = require ('express');
const router = express.Router();
const apiUrl = 'https://breakingbadapi.com/api/characters';
const getAllCharacters = require('./Controllers/getAllCharacters')

router.get('/', async (req, res) => {
    const name = req.query.name;
    let allCharacters = await getAllCharacters();
    if(name){
        let charactersByName = await allCharacters.filter(a =>
            a.name.toLowerCase().includes(name.toLowerCase())
        )
        charactersByName.length ? 
        res.status(200).send(charactersByName) :
        res.status(404).send('No esta el personaje')
    }
    else{
        res.status(200).send(allCharacters)
    }
})

module.exports = router