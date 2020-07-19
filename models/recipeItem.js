const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create recipe item Schema & model

const recipeItemSchema = new Schema({
    // id: {
    //     type: Number,
    //     required: [true, 'ID field is required']
    // },
    title: {
        type: String,
        required: [true, 'title field is required']
    },
    date: {
        type: String,
        required: [true, 'date field is required']
    },
    image: {
        type: String,
        required: [true, 'image field is required']
    },
    description: {
        type: String,
        required: [true, 'description field is required']
    }
})

const recipeItem = mongoose.model('recipeItem', recipeItemSchema)

module.exports = recipeItem;