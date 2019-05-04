const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');

todoRouter.get('/', (req, res) => {
    const queryString = `SELECT * FROM "to-do" ORDER BY "completed" ASC;`;
    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })

        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

todoRouter.post('/', (req,res) => {
const taskObject = req.body;

console.log(taskObject);

const queryString = `INSERT INTO "to-do" (task)
                            VALUES ($1, false);`;

    pool.query(queryString, [
       taskObject.task,
        taskObject.completed])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('Error saving to DB: ', err);
        res.sendStatus(500);
    });
});

// todoRouter.put('/read/:id', (req,res) =>{
//     const queryString = `UPDATE bookstore SET "read"=true WHERE id=$1;`;

//     pool.query(queryString, [req.params.id])
//     .then((response) => {
//         res.sendStatus(200);
//     })
//     .catch((err) => {
//         console.log('Error updating: ', err);
//         res.sendStatus(500);
//     });
// });

// todoRouter.delete('/delete/:id', (req,res) => {
//     const queryString = `DELETE FROM bookstore WHERE id=$1;`;

//     pool.query(queryString, [req.params.id])
//     .then((response) => {
//         res.sendStatus(200);
//     })
//     .catch((err) => {
//         console.log('Error deleting: ', err);
//     });
// })

module.exports = todoRouter;