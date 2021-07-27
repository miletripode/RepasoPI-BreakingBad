const axios = require('axios');
const { Character, Occupation } = require('../../db');
var express = require ('express');
const router = express.Router();
const apiUrl = 'https://breakingbadapi.com/api/characters';

const getDataBaseInfo = async () => {
    return await Character.findAll({
        attributes: ['id', 'name', 'nickname', 'birthday', 'image', 'status', 'seasons' ],
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

module.exports = getDataBaseInfo;