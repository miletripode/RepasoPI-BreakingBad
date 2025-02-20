import axios from 'axios';

export function getAllCharacters(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/characters')
        return dispatch({type: 'GET_CHARACTERS', payload: json.data})
    }
}