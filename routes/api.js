const express = require("express");
const router = express.Router();
const RecipeItem = require("../models/recipeItem");
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

router.get('/recipeList', (req, res, next) => {
    RecipeItem.find((err, recipeItem) => {
        if (err) return next(err);
        res.json(recipeItem);
    });
});

router.post('/recipeList', (req, res, next) => {
    RecipeItem.create(req.body)
    .then((recipeItem) => {
        res.send(recipeItem)
    })
    .catch(next)
})

router.put('/recipeList/:id', (req, res, next) => {
    RecipeItem.findByIdAndUpdate({_id:req.params.id}, req.body)
    .then(() => {
        RecipeItem.findOne({_id: req.params.id})
        .then((recipeItem) => {
            res.send(recipeItem)
        })  
    })
})

router.delete('/recipeList/:id', (req, res, next) => {
    RecipeItem.findByIdAndRemove({_id: req.params.id})
    .then((recipeItem) => {
        res.send(recipeItem)
    })
})

module.exports = router;