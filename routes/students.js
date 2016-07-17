var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
    students.find(function (err, doc) {
        res.send(doc);
    });
});

module.exports = router;