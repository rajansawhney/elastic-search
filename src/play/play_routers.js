const { Router } = require('express');
const { getSuggestedLines, getMapping, putMapping } = require('./play_service');

const playRoutes = Router()
    .get('/lines', async (req, res) => {
        let { q: searchText } = req.query;
        searchText = searchText.trim();

        try {
            const results = await getSuggestedLines(searchText);
            res.send(results);
        } catch (e) {
            throw new Error('Error from routes: ', e)
        }
    })
    .get('/mapping', async (_, res) => {
        try {
            console.log('trying to get mapping');
            const results = await getMapping();
            res.send(results);
        } catch (e) {
            throw new Error('Error from routes: ', e)
        }
    })
    .put('/mapping', async (req, res) => {
        try {
            console.log('trying to PUT mapping:', req.body);
            const results = await putMapping(req.body);
            res.send(results);
        } catch (e) {
            throw new Error('Error from routes: ', e)
        }
    });

module.exports = {
    playRoutes
};
