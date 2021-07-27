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


router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if(isNaN(id)){
        let characterDetail = Character.findOne({
            where: {
                id: id
            }
        })
        if(characterDetail){
            return res.status(200).send(characterDetail)
        }
        return res.status(404).send('Character does not exist')
    }
    else{
        let characters = await getApiInfo()
        let characterDetail = characters.find(c => c.id == id)
        if(characterDetail){
            return res.status(200).send(characterDetail)
        }
        return res.status(404).send('Character does not exist')
    }
})

router.post('/', async (req, res) => {
    let { name, nickname, birthday, image, status, occupation } = req.body
    
    let characterCreated = await Character.create({name, nickname, birthday, image, status, occupation})

    let occupationDb = await Occupation.findAll({
        where: {name: occupation}
    })

    characterCreated.addOccupation(occupationDb)
    res.send(characterCreated)
})

module.exports = router;