var express = require('express');
var router = express.Router();
var db = require('../db')
var results = null;
/* GET home page. */
router.get('/staffs', function(req, res, next) { 
        console.log('Connected to mysql db...')
        db.get().query('SELECT * FROM micro_staff', function (err, rows) {
          if (err) return null
          results=rows;
          console.log("printing queries : "+results);
          res.send(results);
        })
        
        //res.render('index');
});

module.exports = router;
