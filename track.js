const mongoose = require('mongoose');

const excerSchema  = new mongoose.Schema({
    description: String,
    duration: Number,
    date: String
})

const TrackSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    log: [excerSchema]
})


module.exports = mongoose.model('Track',TrackSchema);
