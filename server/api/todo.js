const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/l/:from-:page', getTodo);
router.post('/d/:id', postDeleteTodo);
router.post('/a', postAddTodo);
router.post('/u/:id', postUpdateTodo);

function getTodo (req, res) {
    console.log('get Todo');
    let from = Number(req.params.from);
    let page = Number(req.params.page);
    Todo.find({})
        .skip(from)
        .limit(page)
        .sort({created : -1})
        .lean()
        .then((data) => {
            console.log(data);
            return res.json(data);
        });
}

function postDeleteTodo (req, res) {
    let id = req.params.id;
    Todo.deleteOne({_id : id})
        .then(result => {
            console.log(result);
            return res.status(200).json({deleted : 1});
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({deleted : 0});
        })
}

function postAddTodo (req, res ) {
    let { title , completed } = req.body;
    let data = {title, completed};
    todo = new Todo(data);
    console.log(data);
    todo.save()
        .then(result => {
            console.log(result);
            return res.json({added : 1, data : result});
        }) 
        .catch(error => {
            console.log(error);
            return res.status(500).json({added : 0});
        })
}

function postUpdateTodo (req, res ) {
    let id = req.params.id;
    let { title , completed } = req.body;
    let data = {title, completed};
    for(let key in data) {
        if(data[key] === undefined) delete data[key];
    }
    console.log(data);
    Todo.updateOne({_id : id}, data)
        .then(result => {
            console.log(result);
            return res.json({updated : 1});
        }) 
        .catch(error => {
            console.log(error);
            return res.status(500).json({updated : 0});
        })
}
module.exports = router;