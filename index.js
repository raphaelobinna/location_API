const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const axios = require('axios')
const { Location } = require("./Location");
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();

const connect = mongoose.connect(`${process.env.mongo_uri}`,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(cors())



app.post("/uploadLocation", async (req, res) => {

    try {
       let lock;

       await axios.post(process.env.server_url, { country_id: 160 }, {
        headers: {
          'Authorization': `Bearer ${process.env.token}`
        }
      })
        .then(function (response) {
            lock = response.data.data
            console.log('lock', lock)
          })
          .catch(function (error) {
            console.log(error);
          });
          await Location.create({
              name: lock.name,
              sortname: lock.sortname,
              phoneCode: lock.phoneCode,
              states: lock.states.map(
                  state => ({
                      id: state.id, 
                      name: state.name,
                      cities: state.cities
                    })
              )
          })
    } catch (error) {
        console.log('error received: ', error)
    }
   
    res.status(200).json({ success: true })

});

app.post("/getAll", (req, res) => {

        Location
            .find()
            .exec((err, locations) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, locations })
            })



});

app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
  })

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});