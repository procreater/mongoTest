var express = require('express');
var router = express.Router();
var mongodb = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;

mongodb.connect("mongodb://localhost:27017/school", function (err, db) {
  /* GET */
  router.get('/', function (req, res, next) {

    if (err) throw err;

    db.collection('students').find().toArray(function (err, results) {
      res.render('index', {
        title: "School",
        data: results
      });
    });
  });

  // create
  router.post("/", function (req, res) {
    var name = req.body.name;
    var clas = req.body.class;
    var no = req.body.no;

    db.collection("students").insert({ "name": name, "class": clas, "no": no }, function (err, result) {
      console.log(result);
    });
    res.redirect("/");
  });

  // update get
  router.get("/edit/:id", function (req, res) {
    db.collection("students").find({ "_id": ObjectId(req.params.id) }).toArray(function (err, result) {
      res.render("edit", {
        title: "Edit student",
        data: result
      });
    });
  });

  //update post
  router.post("/edit/:id", function (req, res) {
    var name = req.body.name;
    var clas = req.body.class;
    var no = req.body.no;

    db.collection("students").update({ "_id": ObjectId(req.params.id) }, { "name": name, "class": clas, "no": no }, { upsert: true });
    res.redirect("/");
  });

  //delete
  router.get("/delete/:id", function(req, res){
    db.collection("students").remove({"_id" : ObjectId(req.params.id) });
    res.redirect("/");
  });

});

module.exports = router;