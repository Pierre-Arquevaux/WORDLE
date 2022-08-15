const axios = require("axios");

 const mainController = {

 getWordFromAPI(req, res) {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        //   console.log(response.data);
          res.json(response.data[0])
      }).catch(function (error) {
          console.error(error);
      });
},

}


module.exports = mainController;
