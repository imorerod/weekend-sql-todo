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

router.post('/', (req,res) => {
    const bookObject = req.body;

    console.log(bookObject);

    const queryString = `INSERT INTO bookstore (title, author, published)
                            VALUES ($1, $2, $3);`;

    pool.query(queryString, [
        bookObject.title,
        bookObject.author,
        bookObject.published])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('Error saving to DB: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;