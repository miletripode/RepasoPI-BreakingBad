const axios = require('axios');
const { Character, Occupation } = require('../../db');
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
            seasons: a.appearance.toString(),
            occupation: a.occupation.map(o => o)
        }
    })
    return apiData;
}

module.exports = getApiInfo;