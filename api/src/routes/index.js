const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const charactersRouter = require('./characters')
const characterRouter = require('./character')
const occupationsRoute = require('./occupations')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters', charactersRouter)
router.use('/character', characterRouter)
router.use('/occupations', occupationsRoute)


module.exports = router;
