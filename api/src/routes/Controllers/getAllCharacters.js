const axios = require('axios');
const { Character, Occupation } = require('../../db');
var express = require ('express');
const router = express.Router();
const getApiInfo = require('./getApiInfo')
const getDataBaseInfo = require('./getDataBaseInfo')

const getAllCharacters = async () => {
    const charactersApi = await getApiInfo();
    const charactersDB = await getDataBaseInfo();
    const totalInfo = charactersDB.concat(charactersApi);
    return totalInfo;
}

module.exports = getAllCharacters;