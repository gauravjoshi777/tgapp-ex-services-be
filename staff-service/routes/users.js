var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var db = require('../db')
var results = null;
/* GET home page. */
router.get('/getUser', function(req, res, next) { 
        console.log('Connected to mysql db...')
        db.get().query('SELECT * FROM user', function (err, rows) {
          if (err) return null
          results=rows;
          console.log("printing queries : "+results[0]);
          res.send({user: results[0].user_name});
        })
        
        //res.render('index');
});

module.exports = router;
