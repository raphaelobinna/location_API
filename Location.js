const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    id: {
        type: String,
        maxlength: 50
    },
    name: {
        type: String
    },
    state_id: {
        type: String
    },
  });
  
  const stateSchema = new mongoose.Schema({
    id: {
        type: String,
        maxlength: 50
    },
    name: {
        type: String
    },
    cities: [citySchema],
  });

const locationSchema = mongoose.Schema({
   name: {
       type: String,
       maxlength: 50
   },
   sortname: {
       type: String
   },
   phoneCode: {
       type: Number,
       default: 0
   },
   states: [stateSchema]
}, { timestamps: true })



const Location = mongoose.model('Location', locationSchema);

module.exports = { Location }