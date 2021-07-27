const axios = require('axios');
const { Character, Occupation } = require('../db');
var express = require ('express');
const router = express.Router();
const apiUrl = 'https://breakingbadapi.com/api/characters';

const getApiInfo = async () =>{
    const apiInfo = await axios.get(apiUrl)
    const apiData = apiInfo.data.map(a => {
        return {
            id: a.char_id,
            name: a.name,
            nickname: a.nickname,
            birthday: a.birthday,
            image: a.img,
            status: a.status,
            occupation: a.occupation.map(o => o)
        }
    })
    return apiData;
}

const getDataBaseInfo = async () => {
    return await Character.findAll({
        attributes: ['id', 'name', 'nickname', 'birthday', 'image', 'status' ],
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllCharacters = async () => {
    const charactersApi = await getApiInfo();
    const charactersDB = await getDataBaseInfo();
    const totalInfo = charactersApi.concat(charactersDB);
    return totalInfo;
}

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