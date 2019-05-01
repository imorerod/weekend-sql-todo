const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryString = `SELECT * FROM bookstore;`;
    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })

        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

module.exports = router;