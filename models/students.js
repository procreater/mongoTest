var mongoose = require("mongoose");
var schema = mongoose.Schema;
var studentSchmema = new schema({
    name : String,
    class : String,
    no : Number
});

var Students = mongoose.model("Student", studentSchmema);
module.exports = Students;