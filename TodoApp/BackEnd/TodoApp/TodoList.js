import express from 'express';
import db from '../../dbconnection.js';

const router = express.Router();

router.post('/', async (req, res) => {
   res.send("Data Store into Database")
})

// Using API 
router.get('/TakeData', (request, response) => {
    response.send("Data Get from Database")
});

export default router;